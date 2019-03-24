module.exports = {
  // TODO: in production put it in environment variable instead of config
  LISTEN_PORT: process.env.LISTEN_PORT || 3007,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://doctor_ssm_db:SamSung1442@ds113454.mlab.com:13454/sergiidb',
  // https://www.grc.com/passwords.htm
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'P9825es2D6RNRhLwbHVJuAGgm3vDwWFRNf9dnuukTcckhjyE57pEsmWGVsmoegu'
};
