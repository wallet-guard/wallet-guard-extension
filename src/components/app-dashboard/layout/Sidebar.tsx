import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  Link,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FiBell, FiExternalLink, FiHome, FiSettings } from 'react-icons/fi';
import { TbRobot } from 'react-icons/tb';
import { HiOutlinePuzzle } from 'react-icons/hi';
import { PageContext } from '../../../lib/context/context';
import { PageView } from '../../../models/PageView';
import posthog from 'posthog-js';
import { BsBook, BsDiscord } from 'react-icons/bs';

interface LinkItemProps {
  name: string;
  icon: IconType;
  view: PageView;
  externalLink?: string;
}

const GuestLinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiHome, view: 'dashboard' },
  { name: 'Extensions', icon: HiOutlinePuzzle, view: 'extensions' },
  { name: 'Alert History', icon: FiBell, view: 'alerts' },
  { name: 'ChatWeb3', icon: TbRobot, view: '' as PageView, externalLink: 'https://chat.walletguard.app' },
  { name: 'Academy', icon: BsBook, view: '' as PageView, externalLink: 'https://walletguard.app/academy' },
  { name: 'Support', icon: BsDiscord, view: '' as PageView, externalLink: 'https://discord.gg/mvbtaJzXDP' },
  { name: 'Settings', icon: FiSettings, view: 'settings' },
];

export default function SimpleSidebar({ children }: any) {
  const { currentPage, updatePageView } = useContext(PageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [linkItems, setLinkItems] = useState(GuestLinkItems);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode]);

  interface SidebarProps extends BoxProps {
    onClose: () => void;
  }

  function navItemAction(link: LinkItemProps) {
    posthog.capture(`page name ${link.name}`);

    if (link.view) {
      updatePageView(link.view);
    }
    if (link.externalLink) {
      chrome.tabs.create({ url: link.externalLink });
    }
  }

  const NavItem = ({ icon, active, children, ...rest }: NavItemProps) => {
    return (
      <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          fontWeight={'bold'}
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          background={active ? 'rgba(48, 140, 123, 0.3)' : ''}
          _hover={{
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: 'white',
                }}
                style={{ position: 'absolute' }}
                as={icon}
              />
            </div>
          )}
          <div style={{ marginLeft: '20px' }}>{children}</div>
        </Flex>
      </Link>
    );
  };

  const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
      <Box
        bg={useColorModeValue('white', '#111111')}
        borderRight="1px"
        borderRightColor={'#212121'}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex
          h="20"
          alignItems="center"
          mx="8"
          justifyContent="center"
          style={{ paddingTop: '20%', paddingBottom: '20%' }}
        >
          <img
            alt="Wallet Guard logo"
            src="/images/wg_logos/Wallpaper-Transparent - Edited.png"
            width="150px"
            style={{
              marginLeft: '11px',
              paddingBottom: '8%',
              paddingTop: '10%',
            }}
          />
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>

        {linkItems.map((link) => (
          <NavItem
            key={link.name}
            active={currentPage === link.view}
            icon={link.icon}
            onClick={() => {
              navItemAction(link);
            }}
          >
            <span className="row align-items-center" style={{ marginLeft: '10px' }}>
              {link.name}
              {link.externalLink && (
                <div style={{ marginLeft: '4px' }}>
                  <FiExternalLink />
                </div>
              )}
            </span>
          </NavItem>
        ))}
      </Box>
    );
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', '#111111')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  active: boolean;
  children: ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
