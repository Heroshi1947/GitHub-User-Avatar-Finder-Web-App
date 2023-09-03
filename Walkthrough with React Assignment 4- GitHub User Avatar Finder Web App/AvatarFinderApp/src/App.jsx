import React, { useEffect, useState } from 'react';
import { Typography, Input, List, Card, Image } from 'antd';
import './App.css';


function App() {
  const [searchedText, setSearchedText] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    setLoading(true);
    //API calls
    fetch(`https://api.github.com/users/${searchedText}`)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        setDataSource([response]);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error);
      });
  }, [searchedText]);

  const handleImageClick = (id) => {
    setSelectedItemId(id === selectedItemId ? null : id);
  };

  return (
    <>
      <Typography.Title style={{ color:"red", textAlign: 'center', fontFamily: 'cursive' }}>
       Avatar Finder App
      </Typography.Title>
      <Input.Search
        style={{ maxWidth: 500, display: 'flex', margin: 'auto' }}
        onSearch={(value) => {
          setSearchedText(value);
        }}
      />
      <List
        loading={loading}
        dataSource={dataSource}
        grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
        renderItem={(users) => {
          const isSelected = users.id === selectedItemId;
          return (
            <Card
              style={{ height: "auto", width: "auto" , margin:13, border:"red solid 2px"}}

              key={users.id}
              title={users.name}
              onClick={() => handleImageClick(users.id)}
              className={isSelected ? 'selected' : ''}
            >
              <Image src={users.avatar_url} 
              />
              {isSelected && <p>{users.bio}</p>}
            </Card>
          );
        }}
      ></List>
      
    </>
  );
}

export default App;