import algoliasearch from "algoliasearch";
import config from "../config/config";
import { MongoClient } from "mongodb";
import { Request, Response } from "express";
import { MakeupProduct } from "../models/products/makeup.model";
import { SkinCareProduct } from "../models/products/skincare.model";


export const createaAgoliaSearchIndexHandler = async (req: Request, res: Response) => {
  
  const client = algoliasearch(config.algoliaAppId!, config.algoliaWriteKey!);
  const indexName = 'skinglowSearch'; // Choose a unique name for your index
  const index = client.initIndex(indexName);

  // const uri = config.dbUri;
  // const mongoClient = new MongoClient(uri!); // Initialize your MongoDB connection

  try {
    // await mongoClient.connect();
    // const db = mongoClient.db();
       
    // const makeupCollection = db.collection('skincareproducts');
    // const skincareCollection = db.collection('makeupproducts');
        
    // Fetch all documents from both collections
    // const makeupDocs = await makeupCollection.find().toArray();
    // const skincareDocs = await skincareCollection.find().toArray();
    const makeupDocs = await MakeupProduct.find().populate('categories.makeup.cheekMakeupCategory')
    .populate('categories.makeup.eyesMakeupCategory')
    .populate('categories.makeup.lipsMakeupCategory');
    const skincareDocs = await SkinCareProduct.find().populate('categories.skincare.skinCareCategory')
    .populate('categories.skincare.skinConditionCategory');
        
    // Combine documents from both collections
    const allDocs = [...makeupDocs, ...skincareDocs];
        
    await index.deleteObjects([]); // Optional: Delete existing objects in Algolia
        
    let batch: any[] = [];
    for (const doc of allDocs) {
      batch.push(doc);
      if (batch.length === 100) { // Algolia recommends batches of max 500 objects
        await index.saveObjects(batch);
        batch = [];
      }
    }
        
    if (batch.length > 0) {
      await index.saveObjects(batch, { autoGenerateObjectIDIfNotExist: true });
    }

    // res.status(200).send('Data synced successfully.');
    res.status(200).json(allDocs);
  } catch (error:any) {
    console.error('Error syncing data:', error);
    res.status(500).json({
      message: 'failed to sync data',
      error: error.message
    });
  } 
  // finally {
  //     await mongoClient.close();
  // }
};

// NOTE: this method is incomplete and not implemented in the frontend yet.
export const searchHandler = async (req: Request, res: Response) => {
  const client = algoliasearch(config.algoliaAppId!, config.algoliaSearchKey!);
  const indexName = 'skinglowSearch'; // Choose a unique name for your index
  const index = client.initIndex(indexName);
  const query = 'lip'
  
  try {
    const searchResults = await index.search(query as string);
    res.status(200).json({
      success: true,
      total: searchResults.length,
      searchResults,
    });
  } catch (error:any) {
    console.error('Error searching index:', error);
    res.status(500).json({
      message: 'failed to search index',
      error: error.message
    });
  }
};
