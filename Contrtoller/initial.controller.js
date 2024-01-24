module.exports = {
  getIntialRouteMessage: async (req, res) => {
    return res.status(200).json({
      Message: "Welcome the Log Ingester",
      DeveloperName: "Sankalp Pandey",
      DeveloperNumber: "8840424618",
      DeveloperGitHub: "https://github.com/SANKALP1011",
      DeveloperEmail: "sankalp.pandey1011@gmail.com",
    });
  },
};
