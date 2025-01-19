export const sendData = async (url: string, jsonData: Record<string, unknown>): Promise<any> => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData), // JSON 데이터를 문자열로 변환
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // JSON 응답 처리
      console.log('Response:', result);
      return result; // 결과 반환
    } catch (error) {
      console.error('Error sending data:', error);
      throw error; // 에러를 호출한 곳으로 전달
    }
  };
