import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Image,
    Text,
} from "@chakra-ui/core";

interface ToggleProps {
    isOpen: boolean,
    onClose: () => void,
    state: {
        image: string,
        description: string,
        name: string,
    },
}

const DetailsModal = (Props: ToggleProps) => {
    return (
        <Modal isCentered size="xl" isOpen={Props.isOpen} onClose={Props.onClose}>
            <ModalOverlay />
            <ModalContent rounded="md">
                <ModalHeader p={0}>
                    <Image w="100%" src={Props.state.image} roundedTop="md" />
                </ModalHeader>
                <ModalCloseButton border="none" bg="transparent" _focus={{ outline: "none" }} />
                <ModalBody pt={6} pb={12}>
                    <Text color="standardBlack" pb={3}>{Props.state.name}</Text>
                    <Text color="darkGray" fontSize="sm">{Props.state.description}</Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default DetailsModal;
