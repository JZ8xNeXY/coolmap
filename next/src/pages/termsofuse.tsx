import { Box, Container, Typography } from '@mui/material'
import type { NextPage } from 'next'

const TermOfUse: NextPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{ px: { xs: 2, md: 4 }, mt: { xs: 2, md: 4 } }}
    >
      <Box sx={{ textAlign: 'left', mt: { xs: 2, md: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          サービス利用規約
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第1条（適用）
        </Typography>
        <Typography variant="body1" paragraph>
          本規約は、ユーザーと本サービスの利用に関わる一切の関係に適用されるものとします。本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。本規約の規定が個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第2条（禁止事項）
        </Typography>
        <Typography variant="body1" paragraph>
          ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li">
            ・法令または公序良俗に違反する行為
          </Typography>
          <Typography component="li">犯罪行為に関連する行為</Typography>
          <Typography component="li">
            ・本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為
          </Typography>
          <Typography component="li">
            ・本サービス、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
          </Typography>
          <Typography component="li">
            ・本サービスによって得られた情報を商業的に利用する行為
          </Typography>
          <Typography component="li">
            ・本サービスの運営を妨害するおそれのある行為
          </Typography>
          <Typography component="li">
            ・不正アクセスをし、またはこれを試みる行為
          </Typography>
          <Typography component="li">
            ・他のユーザーに関する個人情報等を収集または蓄積する行為
          </Typography>
          <Typography component="li">
            ・不正な目的を持って本サービスを利用する行為
          </Typography>
          <Typography component="li">
            ・本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為
          </Typography>
          <Typography component="li">他のユーザーに成りすます行為</Typography>
          <Typography component="li">
            ・本サービスが許諾しない本サービス上での宣伝、広告、勧誘、または営業行為
          </Typography>
          <Typography component="li">
            ・面識のない異性との出会いを目的とした行為
          </Typography>
          <Typography component="li">
            ・本サービスのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
          </Typography>
          <Typography component="li">
            ・その他、本サービスが不適切と判断する行為
          </Typography>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          第3条（本サービスの提供の停止等）
        </Typography>
        <Typography variant="body1" paragraph>
          以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li">
            ・本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
          </Typography>
          <Typography component="li">
            ・地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
          </Typography>
          <Typography component="li">
            ・コンピュータまたは通信回線等が事故により停止した場合
          </Typography>
          <Typography component="li">
            ・その他、本サービスが本サービスの提供が困難と判断した場合
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第4条（利用制限および登録抹消）
        </Typography>
        <Typography variant="body1" paragraph>
          ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li">
            ・本規約のいずれかの条項に違反した場合
          </Typography>
          <Typography component="li">
            ・登録事項に虚偽の事実があることが判明した場合
          </Typography>
          <Typography component="li">
            ・本サービスからの連絡に対し，一定期間返答がない場合
          </Typography>
          <Typography component="li">
            ・本サービスについて，最終の利用から一定期間利用がない場合
          </Typography>
          <Typography component="li">
            ・その他，本サービスの利用を適当でないと判断した場合
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          本条に基づき本サービスが行った行為によりユーザーに生じた損害について，一切の責任を負いません。
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第5条（保証の否認および免責事項）
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li">
            ・本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
          </Typography>
          <Typography component="li">
            ・本サービスに起因してユーザーに生じたあらゆる損害について，故意又は重過失による場合を除き，一切の責任を負いません。ただし，本サービスに関する本サービスとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。
          </Typography>
          <Typography component="li">
            ・前項ただし書に定める場合であっても，過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（ユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。また，過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は，ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
          </Typography>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          第6条（サービス内容の変更等）
        </Typography>
        <Typography variant="body1" paragraph>
          ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第7条（利用規約の変更）
        </Typography>
        <Typography variant="body1" paragraph>
          以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li">
            ・本規約の変更がユーザーの一般の利益に適合するとき。
          </Typography>
          <Typography component="li">
            ・本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          ユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第8条（個人情報の取扱い）
        </Typography>
        <Typography variant="body1" paragraph>
          本サービスの利用によって取得する個人情報については、「プライバシーポリシー」に従い適切に取り扱うものとします。
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第9条（権利義務の譲渡の禁止）
        </Typography>
        <Typography variant="body1" paragraph>
          ユーザーは、書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          第10条（準拠法・裁判管轄）
        </Typography>
        <Typography variant="body1" paragraph>
          本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、本サービスの所在地を管轄する裁判所を専属的合意管轄とします。
        </Typography>
      </Box>
    </Container>
  )
}

export default TermOfUse
