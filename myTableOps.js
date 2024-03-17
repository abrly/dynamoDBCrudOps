import { DynamoDBClient, CreateTableCommand,UpdateTableCommand,ListTablesCommand,DescribeTableCommand,DeleteTableCommand } from "@aws-sdk/client-dynamodb";

const client= new DynamoDBClient({region:"us-east-1"});

let createTable = async()=>{

    let command = new CreateTableCommand({

        TableName:"tblExamResult",
        AttributeDefinitions:[
            {
              AttributeName:"student_Id",
              AttributeType:"N"
            },
            {
              AttributeName:"subject_Id",
              AttributeType:"N"
            },
            {
              AttributeName:"result",
              AttributeType:"S"
            }            
          ],
          KeySchema:[{
            AttributeName : "student_Id",
            KeyType:"HASH"
          },
          {
            AttributeName : "subject_Id",
            KeyType:"RANGE"
          }   
        ],
        LocalSecondaryIndexes:[
            {
                IndexName: "StudentsByResult",
                KeySchema: [
                    {
                        AttributeName: "student_Id",
                        KeyType: "HASH"  
                    },
                    {
                        AttributeName: "result",
                        KeyType: "RANGE"  
                    },
                ],
                Projection: {
                    ProjectionType: "ALL"
                }
            }
        ],        
      ProvisionedThroughput:{
        ReadCapacityUnits:1,
        WriteCapacityUnits:1
      }  
  
    });

    let response= await client.send(command);

    console.log(response);


};


createTable();


let updateTable=async()=>{

  let command= new UpdateTableCommand({
    TableName:"tblExamResult",
    ProvisionedThroughput:{
      ReadCapacityUnits:2,
      WriteCapacityUnits:2
    }

  });

  let response= await client.send(command);

  console.log(response);


}

//updateTable();

let lstTables= async()=>{

  let command= new ListTablesCommand({});

  let response= await client.send(command);

  console.log(response);

}

//lstTables();


let describeTbl=async()=>{

  let command= new DescribeTableCommand({
    "TableName":"tblExamResult"
  });

  let response= await client.send(command);
  console.log(JSON.stringify(response,null,2));

}

//describeTbl();

let delTable=async()=>{

  let command= new DeleteTableCommand({
    "TableName":"tblExamResult"
  })

  let response= await client.send(command);
  console.log(JSON.stringify(response,null,2));
  
  

}

//delTable();