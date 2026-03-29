module.exports = {
  apps: [
    {
      name: "@zoolki/server",
      script: "index.js",
      instances: "max",
      exec_mode: "cluster",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
