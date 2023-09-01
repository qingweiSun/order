import { Button, Modal, useDisclosure } from '@nextui-org/react';
import React from 'react';
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';

export const ConfirmButton = ({
  variant,
  color,
  isDisabled,
  isLoading,
  text,
  onConfirm,
  title,
  description,
}: {
  variant: 'flat' | 'shadow';
  color: 'primary' | 'danger';
  isDisabled?: boolean;
  isLoading: boolean;
  text: string;
  title: string;
  description: string;
  onConfirm: () => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        variant={variant}
        color={color}
        isDisabled={isDisabled}
        isLoading={isLoading}
        onClick={onOpen}
      >
        {text}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{description}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    onConfirm();
                  }}
                >
                  确定
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
