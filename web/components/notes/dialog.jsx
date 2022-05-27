import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import IconButton from '@material-ui/core/IconButton'
import Markdown from 'markdown-to-jsx'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { useRef, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props
  return (
    <MuiDialogTitle
      disableTypography
      style={{ wordWrap: 'break-word', width: 'calc(100% - 64px)' }}
      {...other}
      sx={{ m: 0, p: 2 }}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 1,
            top: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
}

export default function ScrollDialog(props) {
  const { open, setOpen, texts, title, images } = props

  function handleClose() {
    setOpen(false)
  }

  const descriptionElementRef = useRef(null)
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <Dialog
      aria-describedby="scroll-dialog-description"
      aria-labelledby="scroll-dialog-title"
      fullWidth
      maxWidth="xl"
      onClose={handleClose}
      open={open}
      scroll="body"
      sx={{
        '& .MuiDialog-paperWidthLg.MuiDialog-paperScrollBody': {
          margin: 0,
          maxWidth: '1280px',
          width: 'calc(100% - 32px)',
        },
      }}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent dividers sx={{ padding: '8px 16px' }}>
        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
          {texts.map((text, index) => (
            <Markdown key={`text-${index}`}>{text}</Markdown>
          ))}
        </DialogContentText>
        {images &&
          images.map((image, index) => (
            // FIXME: Switch to the new Image next component
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`image-${index}`}
              src={image.details.url || image.url}
              alt={'profile image'}
            />
          ))}
      </DialogContent>
    </Dialog>
  )
}
