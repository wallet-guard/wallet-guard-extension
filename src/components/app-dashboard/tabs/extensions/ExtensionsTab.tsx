import { FormControl, Heading, Skeleton, Switch, Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getAllExtensions } from '../../../../services/dashboard/maliciousExtensionService';
import {
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { BsPuzzle } from 'react-icons/bs';
import { Feedback } from '../../../common/Feedback';
import posthog from 'posthog-js';

type Extension = chrome.management.ExtensionInfo;

export interface SelectedExtension {
  id: string;
  enabled: boolean;
  name: string;
}

export interface ExtensionIcon {
  size: number;
  url: string;
}

export const add3Dots = (string: string, limit: number) => {
  var dots = '...';
  if (string.length > limit) {
    string = string.substring(0, limit) + dots;
  }

  return string;
};

export default function ExtensionsTab() {
  const [allExtensions, setAllExtensions] = useState<Extension[]>();
  const [modalToggle, setModalToggle] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [selectedExtension, setSelectedExtension] = useState<SelectedExtension>();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    getAllExtensions().then((response) => {
      setAllExtensions(response);
      isLoading(false);
    });
  }, [disabled]);

  const getCorrectLogo = (extensionLogo: ExtensionIcon[]) => {
    for (let i = 0; i < extensionLogo.length; i++) {
      if (extensionLogo[i]['size'] === 128) {
        return extensionLogo[i]['url'];
      }
    }
    return extensionLogo[0]['url'];
  };

  const enableDisableExtension = () => {
    if (selectedExtension) {
      chrome.management.setEnabled(selectedExtension.id, !selectedExtension.enabled);
      posthog.capture('toggle chrome extension', {
        extensionId: selectedExtension.id,
        enabled: !selectedExtension.enabled,
      });
      setModalToggle(false);
      setDisabled(!disabled);
    }
  };

  const sortByName = (array: Extension[]) => {
    return array.sort(function (a: Extension, b: Extension) {
      var x = a.name;
      var y = b.name;
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  const mapInstallType = (installType: string): string => {
    switch (installType) {
      case 'normal':
        return 'Chrome Web Store';
      case 'sideload':
        return 'Added by a third-party';
      case 'development':
        return 'Unpacked extension';
      default:
        return 'Unknown';
    }
  };

  return (
    <>
      <div className="text-center">
        <Modal isOpen={modalToggle} onClose={() => setModalToggle(false)} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedExtension && selectedExtension.enabled ? (
                <Text>You are about to disable {selectedExtension && selectedExtension.name}</Text>
              ) : (
                <Text>You are about to enable {selectedExtension && selectedExtension.name}</Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={() => setModalToggle(false)}>
                Close
              </Button>
              <Button colorScheme="green" onClick={() => enableDisableExtension()}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>

      <div className="container ">
        <div className="row" style={{ paddingTop: '5%' }}>
          <div className="col-6" style={{ paddingTop: '6%' }}>
            <div>
              <Heading as="h2" size="lg">
                Malicious Extension Detection
              </Heading>
            </div>

            <p className="pt-2 pb-5">
              Wallet Guard alerts you when malicious extensions get installed on your browser protecting you from
              malware and spyware.
            </p>
          </div>
          <div className="col-6 text-center">
            <img src="/images/dashboard/dashboard.png" alt="" />
          </div>
        </div>

        <Skeleton isLoaded={!loading}>
          <div className="row p-5">
            {allExtensions &&
              sortByName(allExtensions).map((extension: Extension) => {
                return (
                  <div className="col-xl-4 col-lg-6 col-sm-12 pt-3 pb-3" key={extension.id}>
                    <div className="card h-100" style={{ backgroundColor: '#121212', minWidth: '260px' }}>
                      <div className="card-body pb-5">
                        <div className="row" style={{ alignItems: 'center' }}>
                          <div className="col-3">
                            {extension.icons ? (
                              <img src={extension && getCorrectLogo(extension.icons)} alt={extension.name} />
                            ) : (
                              <BsPuzzle size="42" color="white" />
                            )}
                          </div>
                          <div className="col-9" style={{ paddingLeft: '0px' }}>
                            <h6 style={{ marginBottom: 0 }}>
                              <b>{extension.name}</b>
                            </h6>
                          </div>
                        </div>

                        <div className="row pt-4">
                          <div className="col-12">
                            <p>{extension && add3Dots(extension.description, 175)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer text-muted">
                        <div className="row">
                          <div className="col-8 pt-1 text-left">{mapInstallType(extension.installType)}</div>
                          <div className="col-4 pt-1 text-right">
                            <FormControl>
                              <Switch
                                size="lg"
                                isDisabled={extension.id === 'pdgbckgdncnhihllonhnjbdoighgpimk'}
                                isChecked={extension.enabled}
                                onChange={() => {
                                  setSelectedExtension({
                                    id: extension.id,
                                    enabled: extension.enabled,
                                    name: extension.name,
                                  });
                                  setModalToggle(true);
                                }}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            <Feedback />
          </div>
        </Skeleton>
      </div>
    </>
  );
}
