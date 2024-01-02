// /src/background/postData.ts

export function postDataToServer(data: any, type: string, userAddress?: string): void {
  // Only send data if the type is 'pageView'
  if (type === 'pageView') {
    const payload: any = {
      type: "pageView",
      client_id: "d3859a90-3d1e-44bf-8925-eb14935442c8",
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

    fetch('https://api.cookiemonster.masa.finance/tracking', {
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