import CloseIcon from '@mui/icons-material/Close'
import { Box, List, ListItem, ListItemText } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSessionContext } from '@/context/SessionContext'
import Header from '@/presentationals/Header'

const HeaderContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [openAddSimpleRestroomModal, setOpenAddSimpleRestroomModal] =
    useState(false)
  const { currentUser } = useSessionContext()

  const openDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === 'keydown') {
        const keyboardEvent = event as React.KeyboardEvent
        if (keyboardEvent.key === 'Tab' || keyboardEvent.key === 'Shift') {
          return
        }
      }
      setIsOpen(open)
    }

  const closeDrawer = () => {
    setIsOpen(!isOpen)
  }

  const DrawerMenuItems = [
    { text: 'TOP', href: '/' },
    { text: '紹介', href: '/about' },
    {
      text: 'お問い合わせ',
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSdZwE2uS1wUDa9NQyJU8yIpv_Qq04WzVAZm5CxNnLrVLtuLKg/viewform',
    },
    { text: '利用規約', href: '/termsofuse' },
    { text: 'プライバシーポリシー', href: '/privacypolicy' },
  ]

  const list = () => (
    <Box
      role="presentation"
      onClick={openDrawer(false)}
      onKeyDown={openDrawer(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <CloseIcon sx={{ m: 1 }} onClick={closeDrawer} />
      </Box>
      <List>
        {DrawerMenuItems.map(({ text, href }) => (
          <Link href={href} passHref key={text}>
            <ListItem>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

  return (
    <Header
      user={currentUser}
      isOpen={isOpen}
      openDrawer={openDrawer}
      openAddSimpleRestroomModal={openAddSimpleRestroomModal}
      setOpenAddSimpleRestroomModal={setOpenAddSimpleRestroomModal}
      list={list}
    />
  )
}

export default HeaderContainer
