import { ChainId } from '@godfatherpepe/sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'
import { NavLink } from 'react-router-dom'

import styled from 'styled-components'

import Logo from '../../assets/images/logo.png'
import LogoDark from '../../assets/images/logo_white.png'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import Settings from '../Settings'
import Menu from '../Menu'

import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import { YellowCard } from '../Card'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledAbsoluteLink href="https://pepeswap.org/#/swap" className="active">Swap</StyledAbsoluteLink>
      <StyledNavLink to={'/coinflip'}>Coin Flip</StyledNavLink>
      <StyledAbsoluteLink href="https://gov.plutopepe.com" target="_blank">Governance</StyledAbsoluteLink>
      <StyledAbsoluteLink href="https://pepeswap.org/#/" target="_blank">Charts</StyledAbsoluteLink>
    </StyledNav>
  )
}

const activeClassName = 'ACTIVE'

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  font-size: 20px;
  line-height: 45px;
  font-weight: 500;
  @media (max-width: 600px) {
    display: none;
  }
`

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  color: #000000;
  padding-left: 10px;
  padding-right: 10px;
  text-decoration: none;
  &:hover {
    color: #FACB34;
  }
  &.active {
    color: #FACB34;
  }
  @media (max-width: 400px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  `

const StyledAbsoluteLink = styled.a`
  color: #000000;
  padding-left: 10px;
  padding-right: 10px;
  text-decoration: none;
  &:hover {
    color: #FACB34;
  }
  &.active {
    color: #FACB34;
  }
  @media (max-width: 400px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`


const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;

  :hover {
    cursor: pointer;
  }
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const UniIcon = styled.div`
  // transition: transform 0.3s ease;
  // :hover {
  //   transform: rotate(-5deg);
  // }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: 'Wrong Network',
  [ChainId.RINKEBY]: 'Wrong Network',
  [ChainId.ROPSTEN]: 'Wrong Network',
  [ChainId.GÖRLI]: 'Wrong Network',
  [ChainId.KOVAN]: 'Wrong Network',
  [ChainId.BSC_MAINNET]: "Binance Smart Chain Network",
  [ChainId.BSC_TESTNET]: 'Testnet'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances([account])[account]
  const [isDark] = useDarkModeManager()

  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start'}} padding="1rem 1rem 0 1rem" >
        <HeaderElement>
          <Title href=".">
            <UniIcon>
              <img style={{ height: 160, width: 160, marginTop: -60 }} src={isDark ? LogoDark : Logo} alt="logo" />
            </UniIcon>
          </Title>
        </HeaderElement>
        <Nav />
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} BNB
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            <Settings />
            <Menu />
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}