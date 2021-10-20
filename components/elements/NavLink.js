import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { Fragment } from "react";

export default function NavLink(props) {
  const { icon, children, link, linkObject, ...rest } = props;

  return (
    <Fragment>
      {link ? (
        <Link href={{ pathname: link, query: linkObject }}>
          <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
            color={useColorModeValue("inherit", "gray.400")}
            _hover={{
              bg: useColorModeValue("gray.100", "gray.900"),
              color: useColorModeValue("gray.900", "gray.200"),
            }}
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            {...rest}
          >
            {icon && (
              <Icon
                mr="2"
                boxSize="4"
                _groupHover={{
                  color: useColorModeValue("gray.600", "gray.300"),
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </Link>
      ) : (
        <Flex
          align="center"
          px="4"
          pl="4"
          py="3"
          cursor="pointer"
          color={useColorModeValue("inherit", "gray.400")}
          _hover={{
            bg: useColorModeValue("gray.100", "gray.900"),
            color: useColorModeValue("gray.900", "gray.200"),
          }}
          role="group"
          fontWeight="semibold"
          transition=".15s ease"
          {...rest}
        >
          {icon && (
            <Icon
              mr="2"
              boxSize="4"
              _groupHover={{
                color: useColorModeValue("gray.600", "gray.300"),
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      )}
    </Fragment>
  );
}
