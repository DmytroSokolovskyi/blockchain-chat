import React from "react";
import LeftMenu from "../../components/leftMenu/LeftMenu.tsx";
import MessageContainer from "../../components/messages/MessageContainer.tsx";

const Home: React.FC = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray bg-clip-padding backdrop-filter backdrop-blur-lg'>
			<LeftMenu />
			<MessageContainer />
		</div>
	);
};
export default Home;
