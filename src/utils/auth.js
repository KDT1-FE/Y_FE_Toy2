function getLoggedInUserInfo() {
  const userId = localStorage.getItem('userId');

  if (userId) {
    return { id: userId, name: 'Test User', picture: 'test.jpg' };
  }

  return null;
}
