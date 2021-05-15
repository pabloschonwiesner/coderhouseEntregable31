module.exports = {
  apps : [{
    name: "app",
    script: "./index.js",
    watch: true,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    node_args: "port=8081"
  }]
}