module.exports = {
  apps: [
    {
      name: "nms-portal",
      script: "server.js",
      cwd: "./.next/standalone",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        // The path to the SQLite database. Usually we set this to an absolute path 
        // outside the standalone folder to persist it across deployments.
        // E.g., DATABASE_URL: "file:../../../prisma/dev.db" 
        // Note: For Hostinger, adjust paths as needed.
      },
    },
  ],
};
