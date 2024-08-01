// import algoliasearch from "algoliasearch";

// async function syncData() {
//     const mongoDb = ...; // Initialize your MongoDB connection
//     const collection = mongoDb.collection('yourCollectionName');
//     const cursor = collection.find(); // Adjust according to your needs
  
//     await index.deleteObjects([]); // Optional: Delete existing objects in Algolia
  
//     let batch = [];
//     for await (const doc of cursor) {
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
  