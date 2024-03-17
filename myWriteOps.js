import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient,PutCommand,UpdateCommand,DeleteCommand,BatchWriteCommand } from "@aws-sdk/lib-dynamodb";

const client=new DynamoDBClient({region:'us-east-1'});

const docClient = DynamoDBDocumentClient.from(client);

let createItem= async()=>{


    let command= new PutCommand({
        TableName:'tblExamResult',
        Item:{
            student_Id:2154,
            subject_Id:1,
            mark:25,
            result:"fail"           
        }
    });

   let response= await docClient.send(command);

   console.log(response);

}

//createItem();

let updateItem=async()=>{

    let command= new UpdateCommand({

        TableName:'tblExamResult',
        Key:{
            student_Id:2154,
            subject_Id:1        
        },
        UpdateExpression: "set #rslt = :rslt, #mrk= :mrk",
        ExpressionAttributeNames :{
            "#rslt": "result",
            "#mrk":"mark"
          },
          ExpressionAttributeValues:{
            ":rslt":"pass",
            ":mrk":80
        }        
    });

    let response= await docClient.send(command);
    console.log(response);


}

//updateItem();

let deleteItem=async()=>{

    let command= new DeleteCommand({
        TableName:"tblExamResult",
        Key:{
            student_Id:2154,
            subject_Id:1  
        }

    });

    let response=await docClient.send(command);
    console.log(response);


}

//deleteItem();

let batchWrite=async()=>{

    let examInfo = [{
        "student_Id": 12458,
        "subject_Id": 1,
        "mark": 25,
        "result":"fail"
    },
    {
        "student_Id": 12458,
        "subject_Id": 2,
        "mark": 56,
        "result":"pass"
    },
    {
        "student_Id": 12458,
        "subject_Id": 3,
        "mark": 90,
        "result":"pass"
    }
];

  let command = new BatchWriteCommand({
    RequestItems: {
      ["tblExamResult"]: examInfo.map(item => {
        return {PutRequest: {Item: item}};
      })
    }
  });


  let response= await docClient.send(command);
  console.log(response);



}

batchWrite();