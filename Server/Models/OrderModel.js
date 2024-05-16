const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    order_Numero: {
      type: Number,
      required: true,
      unique: true,
    },
    //Les informations de l'utilisateur
    order_Utilisateurs: {
      user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
      },
      user_FirstName: {
        type: String,
        required: true,
      },
      user_LastName: {
        type: String,
        required: true,
      },
      user_NumberPhone: {
        type: String,
        required: true,
      },
    },

    //*************************************************** */

    //**********Informations du type de trajet********* */
    order_Trajet: {
      trajet_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TrajetSchema",
        required: true,
      }
    },

    //********************************************************/
    //**********Informations du colis********* */
    order_Colis: {
      colis_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ColisSchema",
        required: true,
      },
      order_ColisName: {
        type: String,
        require: true,
      },
      order_ColisDescription: {
        type: String,
        require: true,
      },
      order_ColisPriceByKG: {
        type: Number,
        default: 0,
      },
      order_ColisPriceByLitre: {
        type: Number,
        default: 0,
      },
    },
    //******************Informations liées à la commande
    order_PoidsColis: {
      type: Number,
      default: 0,
    },
    order_NombreDeLitreColis: {
      type: Number,
      default: 0,
    },
    order_Destinataires: {
      // Tableau de destinataires
      nameDest: {
        type: String,
        required: true,
      },
      adresseDest: {
        type: String,
        required: true,
      },
      telephoneDest : {
        type: Number,
        required: true,
      },
    },
    order_ColisCommentaires: {
      type: String,
    },
    order_ColisStatus: {
      type: String,
      // enum: [
      //   "Colis en attente",
      //   "Colis réceptionné",
      //   "Colis En Cours d'Envoi",
      //   "Colis transmis",
      // ],
      // default: "Colis en attente",
    },
    order_TypePayement: {
      type: String,
      // enum: [" Paiement à la réception ", "Wave", "Orange Money"],
      // default: "Paiement à la réception",
    },
    order_CoutColis: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("OrderSchema", OrderSchema);
