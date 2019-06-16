import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.scss';

const Loading = () => {
   return (
      <div className="loadingAnimation">      
         <ReactLoading color="#3c6cde" type="spokes" 
         width={64} height={64} delay={100} />
      </div>
   );
};

export default Loading;