//@flow

export type Case = {
   ID: string;
   CaseNumber: string;
   CreatedDate: string;
   LastModifiedDate: string;
   Brand: string;
   Country: string;
   Language: string;
   Reason: string;
   Priority: uint32;
   Contact: Contact;
   Owner: User;
   Queue: Queue;
   Status: string;
   EmailMsgs: Array<EmailMsgs>;
   AttachedProductIssuePairs: ProductIssuePairs;

  // predictions
   PredictedProductIssuePairs: ProductIssuePairs;
   PredictedArticles: Articles;
   PredictedEmailResponse: EmailResponse;

  // final state
   DesiredProductIssuePairs: ProductIssuePairs;
   DesiredArticles: Articles;
   DesiredEmailResponse: EmailResponse;
}
