const mongoose = require("mongoose");
// type paiement :  Orange Money, Wave, Espèces
// Statut paiement : En attente , Validé
const PayementSchema = new mongoose.Schema(
  {
    paymentType: {
      type: Number,
      require: true,
    },
    paymentStatut: {
      type: Number,
      require: true,
    },
    payementUserInfos: {
      userFirstName: String,
      userLastName: String,
      userNumberPhone: Number,
    },
    payementTrajetInfos: {
      trajetZone: String,
    },
    // Colis a enregistrer
  },
  { timestamps: true }
);
module.exports = mongoose.model("payementSchema", PayementSchema);
