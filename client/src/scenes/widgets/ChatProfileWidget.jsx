import React from 'react'
import WidgetWrapper from 'components/WidgetWrapper'
import SearchBar from 'scenes/searchBar/SearchBar'
import { useMediaQuery } from '@mui/material'
import UserMessageWidget from './UserMessageWidget'


const ChatProfileWidget = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    return (
        <>
            {isNonMobileScreens && (
                <WidgetWrapper
                    width="30%"
                    minHeight="30vh"
                    height="80vh"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "2rem"
                    }}
                >

                    <SearchBar placeholder="Search for friends" width="15rem" />
                    <UserMessageWidget />


                </WidgetWrapper>
            )}

            {!isNonMobileScreens && (
                <WidgetWrapper
                    width="100%"
                    minHeight="30vh"
                    height="80vh"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "2rem"
                    }}
                >

                    <SearchBar placeholder="Search for friends" width="15rem" />
                    <UserMessageWidget />


                </WidgetWrapper>
            )}
        </>
    )
}

export default ChatProfileWidget