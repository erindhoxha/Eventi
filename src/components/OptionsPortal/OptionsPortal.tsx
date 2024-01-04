import React from "react";
import {
  Box,
  Button,
  Fab,
  Portal,
  Text as MagnusText,
  Icon,
} from "react-native-magnus";

const OptionsPortal = () => {
  return (
    <Portal>
      <Fab
        icon={<Icon name="plus" color="white" fontFamily="FontAwesome" />}
        activeIcon={
          <Icon name="times" color="white" fontFamily="FontAwesome" />
        }
        bg="black"
        h={50}
        w={50}
      >
        <Button p="none" bg="transparent" justifyContent="flex-end">
          <Box rounded="sm" bg="white" p="sm">
            <MagnusText fontSize="md">Cheer</MagnusText>
          </Box>
          <Icon
            name="user"
            color="blue600"
            h={50}
            w={50}
            rounded="circle"
            ml="md"
            bg="white"
          />
        </Button>
        <Button p="none" bg="transparent" justifyContent="flex-end">
          <Box rounded="sm" bg="white" p="sm">
            <MagnusText fontSize="md">Boost</MagnusText>
          </Box>
          <Icon
            name="user"
            color="blue600"
            h={50}
            w={50}
            rounded="circle"
            ml="md"
            bg="white"
          />
        </Button>
      </Fab>
    </Portal>
  );
};

export default OptionsPortal;
