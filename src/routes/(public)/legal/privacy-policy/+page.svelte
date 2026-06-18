<script lang="ts">
  import LegalCallout from "$lib/components/panel/legal-callout.svelte";
  import LegalFooterActions from "$lib/components/panel/legal-footer-actions.svelte";
  import LegalList from "$lib/components/panel/legal-list.svelte";
  import LegalPageLayout from "$lib/components/panel/legal-page-layout.svelte";
  import LegalParagraph from "$lib/components/panel/legal-paragraph.svelte";
  import LegalSection from "$lib/components/panel/legal-section.svelte";
</script>

<LegalPageLayout
  title="Política de Privacidade"
  subtitle="A Negoreserva respeita a sua privacidade e é transparente sobre como os seus dados são tratados."
  updatedAt="18 de Junho de 2026"
>
  {#snippet footerActions()}
    <LegalFooterActions
      relatedHref="/legal/terms-of-use"
      relatedLabel="Termos de Uso"
    />
  {/snippet}

  <LegalSection number="01" title="O Nosso Compromisso">
    <LegalCallout type="success">
      <strong>Princípio fundamental:</strong> A Negoreserva não partilha, vende nem
      cede qualquer informação pessoal do utilizador a terceiros sem o seu consentimento
      explícito — seja através de cookies, integrações com serviços externos ou qualquer
      outro mecanismo.
    </LegalCallout>
    <LegalParagraph>
      Esta Política de Privacidade descreve como a Negoreserva recolhe, utiliza
      e protege os seus dados pessoais no âmbito da utilização da plataforma. O
      utilizador tem controlo total sobre as suas informações.
    </LegalParagraph>
  </LegalSection>

  <LegalSection number="02" title="Dados que Recolhemos">
    <LegalParagraph>
      Recolhemos apenas os dados estritamente necessários para a prestação dos
      serviços:
    </LegalParagraph>
    <LegalList>
      <li>
        Dados de identificação: nome completo, número de BI/passaporte,
        contacto;
      </li>
      <li>Dados de acesso: endereço de email e palavra-passe (encriptada);</li>
      <li>
        Dados de utilização: histórico de reservas, pesquisas e interações na
        plataforma;
      </li>
      <li>
        Dados de pagamento: referências de transação (não armazenamos dados de
        cartão completos);
      </li>
      <li>
        Dados técnicos: endereço IP, tipo de dispositivo e preferências de
        idioma.
      </li>
    </LegalList>
    <LegalCallout type="info">
      Nunca recolhemos dados que não sejam necessários para o funcionamento da
      plataforma. Não há formulários ocultos, rastreadores de terceiros ou
      partilha silenciosa de dados.
    </LegalCallout>
  </LegalSection>

  <LegalSection number="03" title="Cookies e Rastreadores">
    <LegalParagraph>
      Utilizamos cookies exclusivamente para garantir o funcionamento correto da
      plataforma. Não utilizamos cookies de rastreamento publicitário nem
      partilhamos dados de navegação com plataformas de anúncios.
    </LegalParagraph>
    <LegalList>
      <li>
        <strong class="font-semibold text-green-500">Cookies essenciais:</strong
        > necessários para login e segurança — ativos por padrão;
      </li>
      <li>
        <strong class="font-semibold text-green-500"
          >Cookies de preferências:</strong
        > guardam as suas configurações — pode desativar;
      </li>
      <li>
        <strong class="font-semibold text-green-500">Cookies analíticos:</strong
        > métricas de uso anónimas — pode desativar.
      </li>
    </LegalList>
    <LegalParagraph>
      Pode gerir as suas preferências de cookies a qualquer momento nas
      <strong class="font-semibold text-green-500"
        >Definições da Conta → Privacidade</strong
      >.
    </LegalParagraph>
  </LegalSection>

  <LegalSection number="04" title="Como Utilizamos os Seus Dados">
    <LegalParagraph>
      Os seus dados são utilizados exclusivamente para:
    </LegalParagraph>
    <LegalList>
      <li>Processar e confirmar reservas realizadas na plataforma;</li>
      <li>
        Enviar notificações relacionadas com as suas reservas (confirmações,
        lembretes, cancelamentos);
      </li>
      <li>Prestar suporte técnico e resolver problemas reportados;</li>
      <li>Melhorar a plataforma com base em padrões de uso anónimos;</li>
      <li>Cumprir obrigações legais vigentes em Angola.</li>
    </LegalList>
    <LegalCallout type="warning">
      <strong>Nunca fazemos:</strong> marketing não solicitado, partilha de dados
      com anunciantes, venda de perfis de utilizador ou integração com redes sociais
      sem autorização explícita.
    </LegalCallout>
  </LegalSection>

  <LegalSection number="05" title="Os Seus Direitos">
    <LegalParagraph>
      O utilizador tem direito a controlo total sobre os seus dados pessoais na
      plataforma Negoreserva:
    </LegalParagraph>
    <LegalList spacing="relaxed">
      <li>
        <strong class="font-semibold text-green-500"
          >Acesso ao histórico completo:</strong
        >
        pode visualizar e exportar todo o seu histórico de atividade — reservas,
        pagamentos, pesquisas e interações — em
        <em class="italic text-gray-500">Conta → O Meu Histórico</em>;
      </li>
      <li>
        <strong class="font-semibold text-green-500"
          >Exportação dos dados:</strong
        > pode solicitar a exportação de todos os seus dados pessoais em formato
        JSON ou CSV, sem qualquer custo;
      </li>
      <li>
        <strong class="font-semibold text-green-500"
          >Eliminação da conta:</strong
        > tem o direito de eliminar permanentemente a sua conta e todos os dados
        associados. Após confirmação, os dados são removidos em até 30 dias, exceto
        os que a lei exija conservar;
      </li>
      <li>
        <strong class="font-semibold text-green-500">Retificação:</strong> pode corrigir
        informações incorretas no seu perfil a qualquer momento;
      </li>
      <li>
        <strong class="font-semibold text-green-500"
          >Oposição ao tratamento:</strong
        > pode opor-se ao tratamento de dados para fins analíticos ou de melhoria
        do serviço.
      </li>
    </LegalList>
    <LegalCallout type="success">
      Para exercer qualquer um destes direitos, aceda a <strong
        >Conta → Privacidade e Dados</strong
      >
      ou contacte-nos em
      <a
        href="mailto:privacidade@negoreserva.ao"
        class="font-semibold text-green-700 hover:underline"
      >
        privacidade@negoreserva.ao
      </a>. Respondemos em até 5 dias úteis.
    </LegalCallout>
  </LegalSection>

  <LegalSection number="06" title="Segurança dos Dados">
    <LegalParagraph>
      Aplicamos medidas técnicas e organizacionais para proteger os seus dados:
    </LegalParagraph>
    <LegalList>
      <li>Encriptação em trânsito via HTTPS/TLS em todas as comunicações;</li>
      <li>
        Palavras-passe armazenadas com hash seguro (nunca em texto claro);
      </li>
      <li>
        Acesso interno aos dados restrito a funcionários com necessidade
        comprovada;
      </li>
      <li>Registos de auditoria para detetar acessos não autorizados.</li>
    </LegalList>
    <LegalParagraph>
      Em caso de violação de dados que afete os seus dados pessoais, será
      notificado no prazo de 72 horas após a deteção do incidente.
    </LegalParagraph>
  </LegalSection>

  <LegalSection number="07" title="Partilha com Terceiros">
    <LegalParagraph>
      Os seus dados pessoais <strong class="font-semibold text-green-500"
        >nunca são partilhados com terceiros</strong
      > sem o seu consentimento explícito, com as seguintes exceções restritas:
    </LegalParagraph>
    <LegalList spacing="relaxed">
      <li>
        <strong class="font-semibold text-green-500"
          >Prestadores de serviço reservados:</strong
        > partilhamos apenas nome e contacto para confirmar a reserva com o hotel,
        restaurante ou operador;
      </li>
      <li>
        <strong class="font-semibold text-green-500"
          >Processadores de pagamento:</strong
        > dados mínimos necessários para processar a transação de forma segura via
        Multicaixa ou outros gateways;
      </li>
      <li>
        <strong class="font-semibold text-green-500">Obrigação legal:</strong> quando
        exigido por autoridades competentes angolanas mediante ordem judicial ou
        legal válida.
      </li>
    </LegalList>
  </LegalSection>

  <LegalSection number="08" title="Alterações a Esta Política">
    <LegalParagraph>
      Qualquer alteração significativa a esta Política de Privacidade será
      comunicada ao utilizador por email e/ou notificação na plataforma com um
      mínimo de 15 dias de antecedência antes de entrar em vigor.
    </LegalParagraph>
    <LegalParagraph>
      O utilizador pode consultar o histórico de versões desta política na
      secção
      <strong class="font-semibold text-green-500">Central de Ajuda → Documentos Legais</strong>
    </LegalParagraph>
  </LegalSection>
</LegalPageLayout>
