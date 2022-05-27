// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types

export interface TwilioRequest {
   From: string
   To: string
   Body: string
}

export interface TwilioResponse {
   sid: string
   date_created: string
   date_updated: string
   date_sent?: string | null
   account_sid: string
   to: string
   from: string
   messaging_service_sid: string | null
   body: string
   status: string
   num_segments: string
   num_media: string
   direction: string
   api_version: string
   price: string | null
   price_unit: string
   error_code: string | null
   error_message: string | null
   uri: string
   subresource_uris: {
     media: string
   }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Environment

function API(account_sid:string) {
   return `https://api.twilio.com/2010-04-01/Accounts/${account_sid}/Messages.json`
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Query


