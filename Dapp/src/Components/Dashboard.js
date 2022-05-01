import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CandInfo from "../Data/CandidateInfo.json";

function RenderDashboardItem({item, onClick}){
    return(
        <Card className="col-4 col-md-4 m-4" style={{height: "400px", width: "250px"}}>
            <Link style={{textDecoration: 'none', color: 'black'}} to={`/candidate/${item.id}`}>
                <Card.Img style={{height: "300px", width: "225px"}} src={item.image} alt={item.name} />
                <Card.Title><h3 className='m-4' style={{textAlign: "center"}}>{item.name}</h3></Card.Title>
            </Link>
        </Card>
    );
}

const Dashboard = () => {
    const menu = CandInfo.map((item) => {
        return (
            <div key={item.id} style={{marginLeft: "30px"}}>
                <RenderDashboardItem item={item} />
            </div>
          );
    });

    return(
      <div className='flex-container' style={{display: "flex"}}>
        {menu}
      </div>
    )
}

export default Dashboard;