const mongoose = require("mongoose");

const trajetSchema = new mongoose.Schema(
  {
    trajetZoneName: { //Définit si c'est national, régional ou international
      type: String,
      require : true,
    },
    trajetZoneDeparture: { //Définit la zone de départ
      type: String,
      require : true,
    },
    trajetZoneArrival: { //Définit la zone d'arrivée
      type: String,
      require : true,
    },
    trajetZonePrix : {
      type : Number,
      require:true,
    },
    trajetFrequenceZone:{
      type:String,
    },
    trajetDateHeureDepart: {
      type: Date,
    },
    trajetDateHeureArrivee: {
      type: Date,
    },

    trajetCommentaires: {
      type: String,
    },
    //Pour Stocker l'utilisateur qui a définit ou créé le trajet'
    trajetUserGP: {
      userFirstName: string,
      userLastName: string,
      userNumberPhone: string,
    },
    //Pour Stocker les utilisateurs ayant commandé ce trajet
    trajet_ListUsersForTrajet: [
      {
        userFirstName: {
          type: String,
        },

        userLastName: {
          type: String,
        },
        userNumberPhone: {
          type: String,
        },
        colisName: {
          type: String,
          enum: [
            "Courrier - Enveloppe",
            "Carton - Boîte",
            "Emballage - Sachet",
            "Valise",
          ],
          default: "Courrier - Enveloppe",
        },
        colisDescription: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("TrajetSchema", trajetSchema);
