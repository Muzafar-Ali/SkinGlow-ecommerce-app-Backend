// import algoliasearch from "algoliasearch";
// import config from "../config/config";

// // Replace with your actual Application ID and Admin API Key
// const ALGOLIA_APP_ID = 'YourAppId';
// const ALGOLIA_ADMIN_KEY = 'YourAdminApiKey';

// const client = algoliasearch(config.algoliaAppId!, config.algoliaAdminKey!);
// const indexName = 'skinglowSearch'; // Choose a unique name for your index
// const index = client.initIndex(indexName);

// async function syncData() {
//     const mongoDb = ...; // Initialize your MongoDB connection
//     const collection = mongoDb.collection('yourCollectionName');
//     const cursorMakeup = collection.find(); // Adjust according to your needs
//     const cursorSkincare = collection.find(); // Adjust according to your needs
//     const cursorCombineProducts = [...cursorMakeup, ...cursorSkincare];
  
//     await index.deleteObjects([]); // Optional: Delete existing objects in Algolia
  
//     let batch = [];
//     for await (const doc of cursorCombineProducts) {
//       batch.push(doc);
//       if (batch.length === 100) { // Algolia recommends batches of max 500 objects
//         await index.saveObjects(batch);
//         batch = [];
//       }
//     }
  
//     if (batch.length > 0) {
//       await index.saveObjects(batch);
//     }
//   }
  
//   syncData().catch(console.error);
  