module.exports = (req, res, next) => {
  const agora = new Date();
  const hora = agora.getHours();
  if (hora < 7 || hora >= 17) {
    return res.status(403).json({ message: "Fora do horário de funcionamento (07:00-17:00)" });
  }
  next();
};
