# 📌 Concept général
- ✅ Gère une file d’attente de requêtes (tasks à exécuter, Promises)
- ✅ Surcharge certaines files pour simuler du stress
- ✅ Fait de l’auto-scale (spawn de nouvelles instances quand ça sature)
- ✅ Load balance intelligemment (redirige les tâches en fonction de la charge)
- ✅ Peut être monitoré via API / Dashboard


# 🔥 Architecture du monstre
## 1️⃣ Ingestion des requêtes

- CLI ou interface web pour envoyer des tâches
- API REST ou WebSockets pour push des jobs dans la file
- Stockage en Redis ou Kafka pour gérer la file
- Priorisation des tâches (low, medium, high)

## 2️⃣ Load Balancer & Dispatching

- Algo de répartition basé sur :
- Round Robin (simple, chaque serveur reçoit une tâche à tour de rôle)
- Least Connections (envoyer la tâche au serveur le moins chargé)
- Weighted Load Balancing (certains serveurs ont + de capacité que d’autres)
- Gestion des workers et des files
  

## 3️⃣ Auto-scaling & gestion des surcharges

- Détection de surcharge (ex: un worker a + de X jobs en attente → scale up)
- Kill automatique des instances sous-utilisées (scale down)
## 4️⃣ Monitoring et Interface d’admin

- Un dashboard qui affiche :
- Charge de chaque worker
- Temps moyen de traitement
- Files en retard / bloquées
- Nombre d’instances actives
- API pour piloter les workers et l’auto-scaling

# 🚀 Déroulé du projet
1️⃣ Phase 1 : Construire le gestionnaire de files et l’API pour push les tâches
2️⃣ Phase 2 : Implémenter le load balancer avec gestion de surcharge
3️⃣ Phase 3 : Intégrer l’auto-scaling basé sur la charge
4️⃣ Phase 4 : Ajouter le monitoring et le dashboard
5️⃣ Phase 5 : Optimisation & tests sous forte charge