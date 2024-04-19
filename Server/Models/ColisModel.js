const mongoose = require("mongoose");

const ColisShema = new mongoose.Schema(
  {
    colisName: {
      //"Courrier - Enveloppe", "Carton - Boîte", "Emballage - Sachet", "Valise"
      type: String,
      require: true,
    },
    colisDescription: {
      type: String,
    },
    colisPriceByKG: {
      type: Number,
      default: 0,
    },
    colisPriceByLitre: {
      type: Number,
      default: 0,
    },
    colisWeightOfKg: {
      type: Number,
      default: 0,
    },
    colisNumberOfLitre: { type: Number, default: 0 },

    colisDestinataire: {
      firstName: String,
      lastName: String,
      Adresse: String,
      zoneDestinataire: String,
      require: true,
    },
    colisStatus: {
      type: String,
      enum: [
        "Colis en attente",
        "Colis réceptionné",
        "Colis En Cours d'Envoi",
        "Colis transmis",
      ],
      default: "Colis en attente",
    },
    colisModeEnvoi: {
      type: Boolean,
    },
    ColisModeReception: {
      type: Boolean,
    },
    colisPTotalPrice: { type: Number, default: 0 },

    Colis_TrajetID: { type: mongoose.Schema.Types.ObjectId, ref: TrajetSchema },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ColisSchema", ColisShema);
