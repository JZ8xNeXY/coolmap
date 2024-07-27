import { Box, Container, Typography } from '@mui/material'
import type { NextPage } from 'next'

const PrivacyPolicy: NextPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{ px: { xs: 2, md: 4 }, mt: { xs: 2, md: 4 } }}
    >
      <Box sx={{ textAlign: 'left', mt: { xs: 2, md: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          プライバシーポリシー
        </Typography>
        <Typography variant="body1" paragraph>
          Quick Clean Restroom
          Map（以下、「本サービス」といいます。）は、本ウェブサイト上で提供するサービスにおける、
          ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第1条（お客様から取得する情報）
        </Typography>
        <Typography variant="body1" paragraph>
          本サービスは、お客様から以下の情報を取得します。
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li">
            ・外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
          </Typography>
          <Typography component="li">
            ・Cookie(クッキー)を用いて生成された識別情報
          </Typography>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          第2条（お客様の情報を利用する目的）
        </Typography>
        <Typography variant="body1" paragraph>
          本サービスは、お客様から取得した情報を、以下の目的のために利用します。
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li">
            ・お客様の本サービスの利用履歴を管理するため
          </Typography>
          <Typography component="li">
            ・お客様からのお問い合わせに対応するため
          </Typography>
          <Typography component="li">
            ・本サービスの規約や法令に違反する行為に対応するため
          </Typography>
          <Typography component="li">
            ・本サービスの変更、提供中止、終了、契約解除をご連絡するため
          </Typography>
          <Typography component="li">・本規約の変更等を通知するため</Typography>
          <Typography component="li">
            ・以上の他、本サービスの提供、維持、保護及び改善のため
          </Typography>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          第3条（安全管理のために講じた措置）
        </Typography>
        <Typography variant="body1" paragraph>
          本サービスが、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第4条（第三者提供）
        </Typography>
        <Typography variant="body1" paragraph>
          本サービスは、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。但し、次の場合は除きます。
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li">
            ・個人データの取扱いを外部に委託する場合
          </Typography>
          <Typography component="li">
            ・事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
          </Typography>
          <Typography component="li">
            ・その他、法律によって合法的に第三者提供が許されている場合
          </Typography>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          第5条（位置情報の収集と利用）
        </Typography>
        <Typography variant="body1" paragraph>
          本サービスは、提供する機能の一部としてGPS技術を使用してお客様の位置情報を収集することがあります。お客様の位置情報は、[具体的な利用目的]のためにのみ使用されます。位置情報の収集と利用には、お客様の明示的な同意が必要です。お客様は、いつでも設定を変更することにより、位置情報の収集を停止することができます。
        </Typography>
        <Typography variant="body1" paragraph>
          収集した位置情報は第三者と共有されることはありません。本サービスは、お客様の位置情報を保護するために、適切な安全措置を講じています。
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第6条（アクセス解析ツール）
        </Typography>
        <Typography variant="body1" paragraph>
          当方は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第7条（プライバシーポリシーの変更）
        </Typography>
        <Typography variant="body1" paragraph>
          当方は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第8条（お問い合わせ）
        </Typography>
        <Typography variant="body1" paragraph>
          お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、お問い合わせまでお願いいたします。
        </Typography>
      </Box>
    </Container>
  )
}

export default PrivacyPolicy
