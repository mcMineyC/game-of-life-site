class GameOfLifeAPI {
  constructor(baseUrl = "http://localhost:5000") {
    this.baseUrl = baseUrl;
  }

  // Helper method for making HTTP requests
  async fetchJson(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  // Get server status
  async getStatus() {
    return await this.fetchJson("/status");
  }

  // Get lexicon patterns with pagination
  async getLexicon(page = 1, perPage = 50) {
    return await this.fetchJson(
      `/lexicon/get?page=${page}&per_page=${perPage}`,
    );
  }

  // Search lexicon patterns
  async searchLexicon(query) {
    return await this.fetchJson(
      `/lexicon/search?q=${encodeURIComponent(query)}`,
    );
  }

  // Get specific lexicon pattern by ID
  async getLexiconById(id) {
    return await this.fetchJson(
      `/lexicon/get-named?id=${encodeURIComponent(id)}`,
    );
  }

  // Get patterns with pagination
  async getPatterns(page = 1, perPage = 50) {
    return await this.fetchJson(
      `/patterns/get?page=${page}&per_page=${perPage}`,
    );
  }

  // Search patterns
  async searchPatterns(query) {
    return await this.fetchJson(
      `/patterns/search?q=${encodeURIComponent(query)}`,
    );
  }

  // Get specific pattern by ID
  async getPatternById(id) {
    return await this.fetchJson(
      `/patterns/get-named?id=${encodeURIComponent(id)}`,
    );
  }

  // Run simulation
  async runSimulation(rle, interval = 0.25) {
    return await this.fetchJson(
      `/run?rle=${encodeURIComponent(rle)}&interval=${interval}`,
    );
  }

  // Stop simulation
  async stopSimulation() {
    return await this.fetchJson("/stop");
  }

  // Translate between formats
  async translate(from, to, data) {
    return await this.fetchJson("/translate", {
      method: "POST",
      body: JSON.stringify({ from, to, data }),
    });
  }
}

class GameOfLifeController {
  constructor(url = "ws://localhost:5001") {
    this.url = url;
    this.ws = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // Start with 1 second delay

    // State management
    this.cameraPos = { x: -1, y: 1 };
    this.interval = 0.25;
    this.showOutput = false;
    this.autofocus = false;

    // Bind methods
    this.connect = this.connect.bind(this);
    this.reconnect = this.reconnect.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  async connect() {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = async () => {
        console.log("Connected to server");
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;

        // Initial setup
        await this.sendCommand({
          type: "setrle",
          data: "4bo$3b3o$2b2ob2o2$bobobobo2bo$2o3bo3b3o$2o3bo6bo$10bobo$8bobo$9bo2bo$12bo!",
        });

        await this.sendCommand({
          type: "setcamera",
          x: this.cameraPos.x,
          y: this.cameraPos.y,
        });

        await this.sendCommand({
          type: "setinterval",
          data: this.interval,
        });

        await this.sendCommand({
          type: "stop",
        });
      };

      this.ws.onmessage = this.handleMessage;

      this.ws.onclose = () => {
        console.log("Connection closed");
        this.isConnected = false;
        this.reconnect();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.isConnected = false;
      };
    } catch (error) {
      console.error("Connection error:", error);
      this.reconnect();
    }
  }

  reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);

    setTimeout(() => {
      this.connect();
      this.reconnectDelay *= 2; // Exponential backoff
    }, this.reconnectDelay);
  }

  async sendCommand(command) {
    if (!this.isConnected) {
      console.warn("Not connected to server");
      return;
    }
    try {
      this.ws.send(JSON.stringify(command));
    } catch (error) {
      console.error("Error sending command:", error);
    }
  }

  handleMessage(event) {
    try {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "grid":
          if (this.showOutput) {
            console.log(data.data);
          }
          break;
        case "info":
          console.log("New message from server:", data.message);
          break;
        case "camerapos":
          this.cameraPos = { x: data.data.x, y: data.data.y };
          if (this.showOutput) {
            console.log("Camera at position", this.cameraPos);
          }
          break;
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  }

  // Control methods
  async moveCameraUp() {
    this.cameraPos.x--;
    await this.sendCommand({
      type: "setcamera",
      x: this.cameraPos.x,
      y: this.cameraPos.y,
    });
  }

  async moveCameraDown() {
    this.cameraPos.x++;
    await this.sendCommand({
      type: "setcamera",
      x: this.cameraPos.x,
      y: this.cameraPos.y,
    });
  }

  async moveCameraLeft() {
    this.cameraPos.y--;
    await this.sendCommand({
      type: "setcamera",
      x: this.cameraPos.x,
      y: this.cameraPos.y,
    });
  }

  async moveCameraRight() {
    this.cameraPos.y++;
    await this.sendCommand({
      type: "setcamera",
      x: this.cameraPos.x,
      y: this.cameraPos.y,
    });
  }

  async stop() {
    await this.sendCommand({ type: "stop" });
  }

  async start() {
    await this.sendCommand({ type: "start" });
  }

  async skipGenerations(gens) {
    await this.sendCommand({
      type: "setinterval",
      data: -1 * gens,
    });
  }

  async doGenerations(gens) {
    await this.sendCommand({
      type: "dogens",
      data: gens,
    });
  }

  async setInterval(interval) {
    this.interval = interval;
    await this.sendCommand({
      type: "setinterval",
      data: interval,
    });
  }

  async setAutofocus(mode) {
    await this.sendCommand({
      type: "setautofocus",
      data: mode, // 'follow', 'center', or 'none'
    });
  }

  toggleOutput() {
    this.showOutput = !this.showOutput;
  }

  async disconnect() {
    if (this.ws) {
      await this.sendCommand({ type: "avadakadavra" });
      this.ws.close();
    }
  }
}
