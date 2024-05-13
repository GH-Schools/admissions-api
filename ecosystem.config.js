module.exports = {
  apps: [
    {
      name: "app-1",
      script: "./src/bin/www.js",
      combine_logs: true,
      out_file: "./logs/app.log",
      error_file: "./logs/app.log",
      listen_timeout: 5000,
      autorestart: true,
      exec_mode: "cluster",
      instances: "1",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
