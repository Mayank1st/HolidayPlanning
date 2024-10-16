import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Img, SimpleGrid, Center, Button, useToast } from '@chakra-ui/react';
import { BsArrowUpRight } from 'react-icons/bs';
import { useState, useEffect } from 'react';

const DistrictSection = () => {
  const { stateName } = useParams(); 
  const [stateData, setStateData] = useState(null); 
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Fetch states data
    const fetchStateData = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/670fce21e41b4d34e443d4fd');
        const data = await response.json();
        
        // Find the state that matches the stateName from params
        const selectedState = data.record.find((s) => s.name === stateName);
        
        if (selectedState) {
          setStateData(selectedState); // Set the state data if found
        } else {
          setStateData(null); // Handle state not found case
        }
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    };

    fetchStateData();
  }, [stateName]);

  if (!stateData) {
    return <Text>State not found</Text>; // Show error if the state doesn't exist
  }

  const handleViewMore = (district) => {
    navigate(`/user/profile`, {
      state: {
        selectedDistrict: district,
        stateName: stateData.name, 
      },
    });
  };

  return (
    <Center py={6} flexDirection="column" width="full">
      <Heading mb={6}>{stateData.name}</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {stateData.districts.map((district, index) => (
          <Box
            key={index}
            w="full"
            maxW="350px"
            h="max-content"
            rounded="sm"
            overflow="hidden"
            bg="white"
            border="1px"
            borderColor="black"
            boxShadow="6px 6px 0 black"
          >
            <Box h="200px" borderBottom="1px" borderColor="black">
              <Img
                src={district.image_url}
                roundedTop="sm"
                objectFit="cover"
                h="full"
                w="full"
                alt={`${district.name} Image`}
              />
            </Box>
            <Box p={4}>
              <Box
                bg="black"
                display="inline-block"
                px={2}
                py={1}
                color="white"
                mb={2}
              >
                <Text fontSize="xs" fontWeight="medium">
                  {district.name}
                </Text>
              </Box>
              <Heading color="black" fontSize="2xl" noOfLines={1}>
                {district.name}
              </Heading>
              <Text color="gray.500" noOfLines={2}>
                {district.description}
              </Text>
            </Box>
            <Box borderTop="1px" borderColor="black">
              <Button
                onClick={() => handleViewMore(district)}
                colorScheme="teal"
                variant="link"
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                roundedBottom="sm"
              >
                <Text fontSize="md" fontWeight="semibold">
                  View more
                </Text>
                <BsArrowUpRight />
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default DistrictSection;
