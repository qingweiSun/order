import { Button, Modal, RadioGroup, useDisclosure } from '@nextui-org/react';
import React from 'react';
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { Radio } from '@nextui-org/radio';

export const RenewalButton = ({
  isDisabled,
  applyIng,
  apply,
}: {
  isDisabled: boolean;
  applyIng: boolean;
  apply: (day: number) => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState('30');

  return (
    <>
      <Button
        variant={'flat'}
        color={'primary'}
        isDisabled={isDisabled}
        isLoading={applyIng}
        onClick={onOpen}
      >
        续期
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          setSelected('30');
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">续期</ModalHeader>
              <ModalBody>
                <RadioGroup
                  label="请选择续期天数"
                  value={selected}
                  onValueChange={setSelected}
                >
                  <Radio value="30">30 天（一个月）</Radio>
                  <Radio value="90">90 天（一个季度）</Radio>
                  <Radio value="180">180 天（半年）</Radio>
                  <Radio value="365">365 天（一年）</Radio>
                  <Radio value="7">7 天（一周）</Radio>
                  <Radio value="15">15 天（半个月）</Radio>
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    apply(Number(selected));
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
