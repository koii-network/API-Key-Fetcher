import axios from 'axios';

async function testCreateTaskVariable() {
  try {
    const response = await axios.post('http://localhost:30017/api/task-variables', {
      label: "Test Variable",
      value: "Test Value"
    });

    console.log('Success:', response.data);
  } catch (error) {
    if (error.response) {
      // Server responded with error
      console.error('Error:', error.response.data);
      console.error('Status:', error.response.status);
    } else {
      // Network error or request failed
      console.error('Request failed:', error.message);
    }
  }
}

// Run the test
testCreateTaskVariable(); 