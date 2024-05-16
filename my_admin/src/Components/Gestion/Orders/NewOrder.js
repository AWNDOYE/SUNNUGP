import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Config from "../../../Services/Config.json";
import axios from "axios";
import { Card, CardBody, Form, Button } from "react-bootstrap";

export default function NewOrder() {
  const { userId, trajetId } = useParams();



  //**********INITIALISATION DES DIFFERENTS ETATS AVEC LEUR GETTEUR ET SETTEURS */
  const [trajet, setTrajet] = useState({
    trajet_ZoneType: "",
    trajet_PlaceDepartureName: "",
    trajet_PlaceArrivalName: "",
    trajet_DateDepart: "",
    trajet_DateArrivee: "",
    trajet_Commentaires: "",
    trajet_zonePrice: 0,
    trajet_FrequenceZone: "",
    trajet_Statut: 0,
    trajetAuteurs: [
      {
        userId: "",
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userNumberPhone: "",
      },
    ],
    trajetListOfUsers: [{ userId: "", userFirstName: "", userLastName: "" }],
  });

  const initialOrder = {
    order_Numero: 0,
    order_Utilisateurs: {
      user_Id: "",
      user_FirstName: "",
      user_LastName: "",
      user_NumberPhone: "",
    },
    order_Trajet: {
      trajet_Id: "",
    },
    order_Colis: {
      colis_Id: "",
      order_ColisName: "",
      order_ColisDescription : "",
      order_ColisPriceByKG: 0,
      order_ColisPriceByLitre: 0,
    },
    order_PoidsColis: 0,
    order_NombreDeLitreColis: 0,
    order_Destinataires: {
      name: "",
      adresse: "",
    },
    order_ColisCommentaires: "",
    order_ColisStatus: "",
    order_TypePayement: "",
    order_CoutColis: 0,
  };
  const [listOfProduct, setListProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [order, setOrder] = useState(initialOrder);
  const [selectedProduct, setSelectedProduct] = useState(null);
  //*************************************************************************************/




  //********SEARCH TRAJT BY ID************************************************* */
  const findTrajet = async () => {
    try {
      const response = await axios.get(
        `${Config.api_url}/showTrajet/${trajetId}`
      );
      setTrajet(response.data.trajet); // Met à jour le state avec les données de la réponse
      console.log(response.data.trajet);
    } catch (error) {
      console.error("Erreur lors de la recherche du produit :", error);
    }
  };
  useEffect(() => {
    findTrajet(); // Appeler findTrajet une fois que le composant est monté
  }, []);
  //********************************************************************************* */



            
  // *****************************Fonction pour formater la date au format ISO 8601 ("yyyy-mm-dd")
  const formatISODate = (dateString) => {
    // Créez une nouvelle instance de Date à partir de la chaîne de date
    const date = new Date(dateString);
    // Vérifiez si la date est valide
    if (isNaN(date.getTime())) {
      // Si la date est invalide, retournez une chaîne vide
      return "";
    }
    // Utilisez la méthode toISOString() pour formater la date au format ISO 8601 ("yyyy-mm-dd")
    // et retournez la partie de la chaîne avant le caractère "T"
    return date.toISOString().split("T")[0];
  };
  //*********************************************************************** */




  //****************Récupération des données la liste des colis depuis l'API via UseEffect  */ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Config.api_url}/allColis`);
        setListProducts(response.data.allColis); // Met à jour le state avec les données de la réponse
        console.log(response.data);
        setLoading(false); // Met à jour le state loading à false une fois que les données sont récupérées
      } catch (error) {
        setError(error); // Met à jour le state error en cas d'erreur
        setLoading(false); // Met à jour le state loading à false en cas d'erreur
      }
    };
    fetchData(); // Appel de la fonction fetchData
  }, []);
  //******************************************************************************* */




//************************************************************************* */
// useEffect(() => {
//     setOrder((newOrder) => ({
//       ...newOrder,
//       order_Colis: {
//         ...newOrder.order_Colis[0],
//         // colis_Id: selectedProduct._id,
//         order_ColisName: selectedProduct.colisTypeName,
//         order_ColisDescription: selectedProduct.order_ColisDescription,
//         order_ColisPriceByKG: selectedProduct.order_ColisPriceByKG,
//         order_ColisPriceByLitre: selectedProduct.order_ColisPriceByLitre,
//       },
//     }));
//   }, [selectedProduct]);

//************************************************************************* */




  ///************AFFICHAGE FORMULAIRE**************************************** */
  //Au clique du bouton ajouter dans le card colis on met à jour l'état avec le produit sélectionné via le setteur setSelectedProduct et on met à jour l'état du formulaire  à true pour l'afficher. Le formulaire permet à  l'utilisateur de renseigner les informations 
  const handleAddOrder = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };
  const renderForm = () => {
    return (
      <Form>
        {/* Ajoutez ici les champs requis pour le formulaire d'affichage du colis */}
        {selectedProduct && (
          <>
            <Form.Label>Type Colis</Form.Label>
            <Form.Text>{selectedProduct.colisTypeName}</Form.Text>

            <Form.Label>Descriptif</Form.Label>
            <Form.Text>{selectedProduct.colisDescription}</Form.Text>

            <Form.Label>Prix / KG</Form.Label>
            <Form.Text>{selectedProduct.colisPriceByKG}</Form.Text>

            <Form.Label>Prix / L</Form.Label>
            <Form.Text>{selectedProduct.colisPriceByLitre}</Form.Text>
          </>
        )}

        <Form.Group controlId="order_Numero">
          <Form.Label>Numéro de commande</Form.Label>
          <Form.Control
            type="number"
            placeholder="Numéro de commande"
            name="order_Numero"
            value={order.order_Numero}
            onChange={(e) => {
              setOrder({
                ...order,
                order_Numero: e.target.value,
              });
            }}
          />
        </Form.Group>

        <Form.Group controlId="order_NB_Poids">
          <Form.Label>Poids Total en KG</Form.Label>
          <Form.Control
            type="number"
            placeholder="Poids en KG"
            name="order_PoidsColis"
            value={order.order_PoidsColis}
            onChange={(e) => {
              setOrder({
                ...order,
                order_PoidsColis: e.target.value,
              });
            }}
          />
        </Form.Group>

        <Form.Group controlId="order_NB_L">
          <Form.Label>Nombre de Litres</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nombre de Litres"
            name="order_NombreDeLitreColis"
            value={order.order_NombreDeLitreColis}
            onChange={(e) => {
              setOrder({
                ...order,
                order_NombreDeLitreColis: e.target.value,
              });
            }}
          />
        </Form.Group>

        <Form.Group controlId="destinataire">
          <h2>Destinataire</h2>
          <Form.Label>Nom - Prénom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom et Prénom Destinataire"
            name="nameDest"
            value={order.order_Destinataires.nameDest}
            onChange={(e) => {
              setOrder({
                ...order,
                order_Destinataires: e.target.value,
              });
            }}
          />

          <Form.Label>Numéro Téléphone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Numéro Tépéphone du destinataire"
            name="telephoneDest"
            value={order.order_Destinataires.telephoneDest}
            onChange={(e) => {
              setOrder({
                ...order,
                order_Destinataires: e.target.value,
              });
            }}
          />

          <Form.Label>Adresse Domicile</Form.Label>
          <Form.Control
            type="text"
            placeholder="Adresse Domicile du Destinataire"
            name="adresseDest"
            value={order.order_Destinataires.adresseDest}
            onChange={(e) => {
              setOrder({
                ...order,
                order_Destinataires: e.target.value,
              });
            }}
          />
        </Form.Group>

        <Form.Group controlId="order_Cout">
          <Form.Label>Coût Total</Form.Label>
          <Form.Control
            type="number"
            placeholder="Coût Total"
            name="order_CoutColis"
            value={order.order_CoutColis}
            onChange={(e) => {
              setOrder({
                ...order,
                order_CoutColis: e.target.value,
              });
            }}
          />
        </Form.Group>

        <Form.Group>
              <Form.Label>Type Paiement</Form.Label>
              <Form.Control
                as="select"
                name="order_TypePayement"
                value={order.order_TypePayement}
                onChange={(e) =>
                    setOrder({
                    ...order,
                    order_TypePayement: e.target.value,
                  })
                }
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="Wave">Wave</option>
                <option value="Orange Money">Orange Money</option>
                <option value="E-Money">E-Money</option>
                <option value="Paiement à la réception">Paiement à la réception</option>
                <option value="Paiement par Carte Bancaire">Paiement par Carte Bancaire</option>
              </Form.Control>
            </Form.Group>


            <Form.Group>
              <Form.Label>Statut Colis</Form.Label>
              <Form.Control
                as="select"
                name="order_ColisStatus"
                value={order.order_ColisStatus}
                onChange={(e) =>
                    setOrder({
                    ...order,
                    order_ColisStatus: e.target.value,
                  })
                }
                required
              >
                
                {/* <option defaultValue={"Colis en attente"}>Colis transmis</option> */}
                <option  value="Colis transmis">Colis transmis</option>
                <option value="Colis en attente">Colis en attente</option>
                <option value="Colis En Cours d'Envoi">Colis En Cours d'Envoi</option>
                <option value="Colis réceptionné">Colis réceptionné</option>
              </Form.Control>
            </Form.Group>

        <Button variant="primary" type="submit">
          Enregistrer
        </Button>
      </Form>
    );
  };
  //***************************************************** */

  return (
    <div>
      NewOrder {trajetId}
      <Card>
        <CardBody>
          <Form>
            <Form.Group controlId="trajetAuteurs">
              <Form.Label>Informations de l'auteur</Form.Label>
              <Form.Label>Nom Prénom </Form.Label>
              <Form.Text>{`${trajet.trajetAuteurs.userFirstName} ${trajet.trajetAuteurs.userLastName}`}</Form.Text>

              <Form.Label>Adresse Email</Form.Label>
              <Form.Text>{trajet.trajetAuteurs.userEmail}</Form.Text>

              <Form.Label>Numéro Téléphone</Form.Label>
              <Form.Text>{trajet.trajetAuteurs.userNumberPhone}</Form.Text>

              <Form.Label>Type Zone :</Form.Label>
              <Form.Text>{trajet.trajet_ZoneType}</Form.Text>

              <Form.Label>Lieu de Départ</Form.Label>
              <Form.Text>{trajet.trajet_PlaceDepartureName}</Form.Text>

              <Form.Label>Lieu de Destination</Form.Label>
              <Form.Text>{trajet.trajet_PlaceArrivalName}</Form.Text>

              <Form.Label>Date Départ</Form.Label>
              <Form.Text>{formatISODate(trajet.trajet_DateDepart)}</Form.Text>

              <Form.Label>Date d'Arrivée</Form.Label>
              <Form.Text>{formatISODate(trajet.trajet_DateArrivee)}</Form.Text>

              <Form.Label>Prix Zone :</Form.Label>
              <Form.Text>{trajet.trajet_zonePrice}</Form.Text>
            </Form.Group>
          </Form>
        </CardBody>

        <CardBody>
          <Form.Group controlId="infosColis">
            {listOfProduct.map((product, index) => (
              <Card key={index} style={{ width: "25rem" }}>
                <img
                  style={{ width: "25rem", height: "28rem" }}
                  src={`http://localhost:5000/uploads/${product.colisImage}`}
                  alt="Colis"
                />
                <CardBody>
                  <h3>
                    <strong>{product.colisTypeName}</strong>
                  </h3>
                  <p>{product.colisPriceByKG}</p>
                  <p>{product.colisPriceByLitre}</p>
                  <p>{product.colisDescription}</p>
                  <Button onClick={() => handleAddOrder(product)}>
                    Ajouter{" "}
                  </Button>
                </CardBody>
              </Card>
            ))}
            {showForm && renderForm()}
          </Form.Group>
        </CardBody>
      </Card>
    </div>
  );
}
