#### Demos
These are a list of React Demos:

#### Lab1
  
1. create a project using tools CREATE REACT APP. It is recommanded for onpage web site.
~~~sh
npx create-react-app lab1
cd lab1
npm start
~~~

2. AXIOS

Axios is a good library to FETCH remode data.
~~~sh
npm install axios
~~~

~~~js
useEffect (() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then (response => setUsers(response.data))
        .catch(err => setError(err))
        .then(setLoading(false)) // Always executed
    }, []);
~~~

#### OAuth Google
1.
~~~sh
npm i react-google-login
~~~
2.(Create credentials)[https://console.developers.google.com/apis/credentials] 

3. Create the Login Component 