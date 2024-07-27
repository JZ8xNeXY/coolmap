/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  Modal,
  FormControlLabel,
  Checkbox,
  Grid,
  Alert,
} from '@mui/material'
import { MutableRefObject } from 'react'
import { Controller } from 'react-hook-form'
import modalStyle from '@/styles/modalStyles'

interface AddSimpleRestroomProps {
  open: boolean
  onClose: () => void
  handleSubmit: any
  onSubmit: any
  control: any
  fileName: string
  imageData: string
  selectImageFile: () => void
  resetImageFile: () => void
  register: any
  fileInput: MutableRefObject<HTMLInputElement | null> //更新可能
  onChange: any
  warningImageMessage: string
  warningCoordMessage: string
}

const AddSimpleRestroom: React.FC<AddSimpleRestroomProps> = ({
  open,
  onClose,
  handleSubmit,
  onSubmit,
  control,
  fileName,
  imageData,
  selectImageFile,
  resetImageFile,
  register,
  fileInput,
  onChange,
  warningImageMessage,
  warningCoordMessage,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Container maxWidth="sm">
          <Box sx={{ mb: 2, pt: 4 }}>
            <Typography
              component="h2"
              sx={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}
            >
              トイレ情報を登録する
            </Typography>
          </Box>
          {warningImageMessage && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {warningImageMessage}
            </Alert>
          )}
          {warningCoordMessage && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {warningCoordMessage}
            </Alert>
          )}
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={1.5}
          >
            <input
              type="file"
              id="file"
              ref={(e) => {
                register.ref(e) // ref関数でフォームに入力した値を管理
                if (e) fileInput.current = e
              }}
              accept="image/*"
              style={{ display: 'none' }}
              capture="environment"
              {...register.rest}
              onChange={onChange}
            />
            <Button
              variant="contained"
              type="button"
              // disabled={}
              sx={{ fontWeight: 'bold', color: 'white' }}
              onClick={selectImageFile}
            >
              <span
                style={{ color: 'white', fontSize: '15px', marginLeft: '5px' }}
              >
                (必須)
              </span>
            </Button>
            <Box
              style={{
                padding: '1em',
                border: '1px dotted #ccc',
                minHeight: '200px',
                background: '#eee',
              }}
            >
              {fileName && (
                <>
                  <Button onClick={resetImageFile}>❌ CLOSE</Button>
                  <img
                    src={imageData}
                    style={{ margin: 'auto', maxWidth: '100%' }}
                    alt="Selected"
                  />
                  <Typography>{fileName}</Typography>
                </>
              )}
            </Box>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="施設名称"
                  sx={{ backgroundColor: 'white' }}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="住所"
                  sx={{ backgroundColor: 'white' }}
                />
              )}
            />
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="コメント"
                  sx={{ backgroundColor: 'white' }}
                />
              )}
            />
            <Typography
              component="p"
              sx={{
                fontSize: 20,
                color: 'black',
              }}
            >
              設備有無
            </Typography>
            <Box>
              <Grid container spacing={0.1}>
                <Grid item xs={10}>
                  <Controller
                    name="nursing_room"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="授乳室"
                        control={<Checkbox {...field} checked={field.value} />}
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Controller
                    name="anyone_toilet"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="誰でもトイレ"
                        control={<Checkbox {...field} checked={field.value} />}
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Controller
                    name="diaper_changing_station"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="オムツ交換台"
                        control={<Checkbox {...field} checked={field.value} />}
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Controller
                    name="powder_corner"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="パウダーコーナー"
                        control={<Checkbox {...field} checked={field.value} />}
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Controller
                    name="stroller_accessible"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="ベビーカー可"
                        control={<Checkbox {...field} checked={field.value} />}
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Controller
              name="evaluation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="評価"
                  sx={{ backgroundColor: 'white' }}
                  style={{ display: 'none' }}
                />
              )}
            />
            <Controller
              name="latitude"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="緯度"
                  sx={{ backgroundColor: 'white' }}
                  value={35.681236}
                  InputProps={{ readOnly: true }}
                  style={{ display: 'none' }}
                />
              )}
            />
            <Controller
              name="longitude"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="経度"
                  sx={{ backgroundColor: 'white' }}
                  value={139.767125}
                  InputProps={{ readOnly: true }}
                  style={{ display: 'none' }}
                />
              )}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              送信する
            </Button>
          </Stack>
        </Container>
      </Box>
    </Modal>
  )
}

export default AddSimpleRestroom
