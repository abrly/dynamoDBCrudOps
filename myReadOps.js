import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient,ScanCommand,QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({region:'us-east-1'});

const docClient = DynamoDBDocumentClient.from(client);

let scanItems= async()=>{

     
    let command=new ScanCommand(
        {
            FilterExpression: "#rslt = :rslt",        
            ExpressionAttributeValues: {
                ":rslt": "pass",
              },  
              ExpressionAttributeNames:{
                "#rslt":"result"
              },     
            ProjectionExpression:"student_Id,mark", 
            TableName:"tblExamResult",     
    

    });

    let response= await docClient.send(command);
    console.log(response);

}

//scanItems();

let queryItems= async()=>{

    let command= new QueryCommand({

        TableName:"tblExamResult",
        KeyConditionExpression:"#stId=:stId",
        ExpressionAttributeValues:{":stId":12458},
        ExpressionAttributeNames:{ "#stId":"student_Id","#rslt":"result"},
        ProjectionExpression:"mark,#rslt",        
        ConsistentRead:false 

    });

    let response= await docClient.send(command);
    console.log(response);

}

queryItems();