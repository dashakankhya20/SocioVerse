import { useState } from 'react';
import { TextField, Autocomplete, useTheme, Box } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import UserImage from 'components/UserImage';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const token = useSelector((state) => state.token);
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (value) => {
        try {
            const response = await fetch(`http://localhost:3001/users/search?searchTerm=${value}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            });
            const searchData = await response.json();
            setSearchResults(searchData);
            console.log("Search Results: ", searchResults)
            console.log("Value: ", value)
        } catch (error) {
            console.error("Error searching: ", error);
        }
    }

    const handleClick = (id) => {
        navigate(`/profile/${id}`)
    }

    return (
        <FlexBetween gap="3rem" position="relative">
            {/* <Autocomplete
                freeSolo
                disableClearable
                options={searchResults.map((item) => item.firstName)}
                onInputChange={(event, value) => {
                    setSearchTerm(value);
                    if (value) {
                        handleSearch(value);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}

                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            startAdornment: <SearchIcon />,
                        }}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "20rem",
                        }}
                    />
                )}
            /> */}
            <Autocomplete
                freeSolo
                disableClearable
                options={searchResults}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                onInputChange={(event, value) => {
                    setSearchTerm(value);
                    if (value) {
                        handleSearch(value);
                    }
                }}
                renderOption={(props, option) => (
                    <Box  
                    {...props}
                    onClick={() => handleClick(option._id)}
                    sx={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-between",
                        gap:"1rem"
                    }}
                    >
                        <UserImage image={option.picturePath} size={"20px"}
                        
                        />
                        {/* <img src={option.picturePath} alt="User" style={{ width: 24, height: 24, marginRight: 8 }} /> */}
                        <div>{`${option.firstName} ${option.lastName}`}</div>
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            startAdornment: <SearchIcon />,
                        }}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "20rem",
                        }}
                    />
                )}
            />

        </FlexBetween>
    );
}

export default SearchBar;
