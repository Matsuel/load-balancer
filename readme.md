# Description du projet : Serveur Load Balancer Scalabilité Automatique
## Le projet consiste à créer un serveur principal ("chef") qui redirige le trafic vers des serveurs de traitement ("nœuds") en fonction de leur latence et de leur charge. Le serveur chef est capable de :

- Vérifier l'état des nœuds et leur latence.
- Rediriger les requêtes au nœud optimal.
- Démarrer de nouvelles instances de nœuds lorsque tous les serveurs sont saturés.
- Se cloner lui-même en cas de surcharge.
- Offrir une IHM (via Next.js) pour suivre les nœuds, consulter leur statut et programmer des tâches.

## Etapes de réalisation :

- Load balancing basique (juste routage simple entre nœuds).
- Gestion des latences et routage intelligent.
- Scaling dynamique des serveurs de traitement.
- Clonage du serveur chef en cas de surcharge.
- Création de l’IHM pour monitorer et interagir avec l’infrastructure.