// /src/background/postData.ts

export function postDataToServer(data: any, type: string, userAddress?: string): void {
  // Only send data if the type is 'pageView'
  if (type === 'pageView') {
    const payload: any = {
      type: "pageView",
      client_id: "13db946a-060e-48df-9cbc-a7ee50e72081",
      event_data: {
        client_app: "Masa Chrome Extension",
        client_name: "Masa",
        page: data.url
      }
    };

    // Add user_address to the payload if it's available
    if (userAddress) {
      payload.user_address = userAddress;
    }

    // Log the payload for debugging
    console.log('Payload to be sent:', payload);

    fetch('http://localhost:3008/tracking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      console.log('Data sent successfully:', response);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
  }
}