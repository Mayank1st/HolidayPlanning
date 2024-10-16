import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { BsArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function StatsSection() {
  const [rowsToShow, setRowsToShow] = useState(2);
  const [statesData, setStatesData] = useState([]);

  const cardsPerRow = 3;
  const totalCardsToShow = rowsToShow * cardsPerRow;
  const navigate = useNavigate();

  const handleShowMore = () => {
    setRowsToShow((prevRows) => prevRows + 2);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/670fce21e41b4d34e443d4fd"
        );
        const data = await response.json();
        setStatesData(data.record);
      } catch (error) {
        console.error("Error fetching states data:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewDistricts = (stateName) => {
    navigate(`/state/district/${encodeURIComponent(stateName)}`);
  };

  return (
    <Center py={6} flexDirection="column" height="100%">
      <Flex direction="column" flex="1" width="full">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mb={6}>
          {statesData.length > 0 &&
            statesData.slice(0, totalCardsToShow).map((state, stateIndex) => (
              <Box
                key={stateIndex}
                w="full"
                maxW="350px"
                h="max-content"
                rounded="sm"
                overflow="hidden"
                bg="white"
                border="1px"
                borderColor="black"
                boxShadow={useColorModeValue(
                  "6px 6px 0 black",
                  "6px 6px 0 cyan"
                )}
              >
                <Box h="200px" borderBottom="1px" borderColor="black">
                  <Img
                    src={state.image_url}
                    roundedTop="sm"
                    objectFit="cover"
                    h="full"
                    w="full"
                    alt={`${state.name} Image`}
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
                      {state.name}
                    </Text>
                  </Box>
                  <Heading color="black" fontSize="2xl" noOfLines={1}>
                    {state.name}
                  </Heading>
                  <Text color="gray.500" noOfLines={2}>
                    {state.districts[0]?.description ||
                      "No description available."}
                  </Text>
                </Box>
                <Box
                  as="button"
                  onClick={() => handleViewDistricts(state.name)}
                  _hover={{ textDecoration: "none", color: "teal.500" }}
                  p={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  roundedBottom="sm"
                  cursor="pointer"
                >
                  <Text fontSize="md" fontWeight="semibold">
                    View Districts
                  </Text>
                  <BsArrowUpRight />
                </Box>
              </Box>
            ))}
        </SimpleGrid>
        {totalCardsToShow < statesData.length && (
          <Center mt={6}>
            <Button
              colorScheme="teal"
              variant="outline"
              style={{ borderWidth: "3px" }}
              onClick={handleShowMore}
            >
              Show More
            </Button>
          </Center>
        )}
      </Flex>
    </Center>
  );
}
