// src/data/mockData.js

export const stats = [
  { label: 'Papers Analyzed',   value: '1,284',  change: '+12%', icon: 'FileText',   color: 'primary' },
  { label: 'Summaries Generated', value: '3,921', change: '+8%',  icon: 'Sparkles',  color: 'purple'  },
  { label: 'Citations Created',  value: '847',    change: '+23%', icon: 'Quote',      color: 'cyan'    },
  { label: 'Hours Saved',        value: '412',    change: '+18%', icon: 'Clock',      color: 'emerald' },
];

export const recentPapers = [
  {
    id: 1,
    title: 'Attention Is All You Need',
    authors: 'Vaswani et al.',
    year: 2017,
    status: 'Analyzed',
    pages: 15,
    date: '2025-05-20',
    keywords: ['Transformers', 'NLP', 'Self-Attention'],
  },
  {
    id: 2,
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: 'Devlin et al.',
    year: 2019,
    status: 'Summarized',
    pages: 16,
    date: '2025-05-19',
    keywords: ['BERT', 'Language Model', 'Pre-training'],
  },
  {
    id: 3,
    title: 'GPT-4 Technical Report',
    authors: 'OpenAI',
    year: 2023,
    status: 'Pending',
    pages: 98,
    date: '2025-05-18',
    keywords: ['GPT-4', 'LLM', 'Multimodal'],
  },
  {
    id: 4,
    title: 'LLaMA: Open and Efficient Foundation Language Models',
    authors: 'Touvron et al.',
    year: 2023,
    status: 'Analyzed',
    pages: 27,
    date: '2025-05-17',
    keywords: ['LLaMA', 'Open Source', 'Efficiency'],
  },
  {
    id: 5,
    title: 'Denoising Diffusion Probabilistic Models',
    authors: 'Ho et al.',
    year: 2020,
    status: 'Summarized',
    pages: 24,
    date: '2025-05-16',
    keywords: ['Diffusion', 'Generative', 'Image Synthesis'],
  },
];

export const activityTimeline = [
  { id: 1, action: 'Paper uploaded',           detail: 'GPT-4 Technical Report.pdf',          time: '2 hours ago',   type: 'upload'  },
  { id: 2, action: 'Summary generated',         detail: 'BERT: Pre-training of Deep...',       time: '5 hours ago',   type: 'summary' },
  { id: 3, action: 'Citation exported',         detail: 'APA format · 3 references',           time: '1 day ago',     type: 'citation'},
  { id: 4, action: 'Literature review created', detail: 'Topic: Transformer Architecture',     time: '2 days ago',    type: 'writing' },
  { id: 5, action: 'Paper analyzed',            detail: 'Attention Is All You Need',           time: '3 days ago',    type: 'analyze' },
];

export const paperAnalysis = {
  title: 'Attention Is All You Need',
  authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit', 'Llion Jones', 'Aidan N. Gomez', 'Łukasz Kaiser', 'Illia Polosukhin'],
  year: 2017,
  journal: 'NeurIPS 2017',
  doi: '10.48550/arXiv.1706.03762',
  pages: 15,
  abstract:
    'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
  keywords: ['Transformers', 'Self-Attention', 'NLP', 'Sequence-to-Sequence', 'Multi-Head Attention', 'Positional Encoding'],
  methodology:
    'The authors propose the Transformer architecture which relies entirely on attention mechanisms. Multi-head self-attention and position-wise fully connected layers form both encoder and decoder stacks. Positional encodings replace recurrence to inject sequence order information.',
  dataset: 'WMT 2014 English-German (4.5M sentence pairs), WMT 2014 English-French (36M sentence pairs), English Constituency Parsing',
  results:
    'Achieved 28.4 BLEU on WMT 2014 English-to-German, surpassing all previous models by more than 2 BLEU points. Trained in 12 hours on 8 GPUs — significantly less than recurrent models.',
  limitations: [
    'Quadratic complexity with respect to sequence length in self-attention',
    'Requires large amounts of training data',
    'Memory-intensive for very long sequences',
  ],
  futureWork: [
    'Apply Transformers to other modalities (images, video, audio)',
    'Develop sparse attention mechanisms for longer sequences',
    'Investigate learned positional encodings',
  ],
  references: [
    { id: 1, text: 'Bahdanau et al. (2015). Neural Machine Translation by Jointly Learning to Align and Translate.', link: '#' },
    { id: 2, text: 'Hochreiter & Schmidhuber (1997). Long Short-Term Memory. Neural Computation.', link: '#' },
    { id: 3, text: 'Sutskever et al. (2014). Sequence to Sequence Learning with Neural Networks.', link: '#' },
    { id: 4, text: 'Cho et al. (2014). Learning Phrase Representations using RNN Encoder-Decoder.', link: '#' },
  ],
};

export const smartSummary = {
  tldr: 'Transformers replace RNNs with pure self-attention for sequence modeling, achieving state-of-the-art NLP results with dramatically faster training.',
  keyContributions: [
    'First architecture to rely entirely on self-attention, eliminating recurrence and convolutions',
    'Multi-head attention allows the model to jointly attend to information from different positions',
    'Positional encodings enable the model to use sequence order without recurrence',
    'Achieves SOTA results on machine translation with significantly less compute',
  ],
  highlights: [
    'Trained 3.5× faster than best recurrent models',
    'BLEU score: 28.4 (EN→DE), 41.0 (EN→FR)',
    'Scales to 100M+ parameter models effectively',
    'Foundation for BERT, GPT, and all modern LLMs',
  ],
  sections: [
    { title: 'Introduction',       summary: 'Recurrent models process tokens sequentially, limiting parallelisation. The paper proposes the Transformer to overcome this bottleneck.'  },
    { title: 'Model Architecture', summary: 'Encoder-decoder structure using stacked self-attention and feed-forward layers. Each layer has residual connections and layer normalisation.' },
    { title: 'Attention Mechanism',summary: 'Scaled dot-product attention and multi-head attention variants are introduced. Multi-head attention allows attending to information from different representation subspaces.' },
    { title: 'Training',           summary: 'Adam optimiser with warmup schedule. Dropout and label smoothing used as regularisation. Trained on 8 NVIDIA P100 GPUs.' },
    { title: 'Results',            summary: 'Outperforms all previous models on EN-DE and EN-FR WMT benchmarks and English constituency parsing tasks.' },
    { title: 'Conclusion',         summary: 'Transformers are faster to train, easier to parallelise, and achieve superior translation quality compared to recurrent and convolutional models.' },
  ],
};

export const writingModules = [
  {
    id: 'literature',
    title: 'Literature Review Generator',
    description: 'Auto-generate structured literature reviews from your uploaded papers.',
    icon: 'BookOpen',
    color: 'from-blue-600 to-primary-600',
    features: ['Thematic clustering', 'Citation management', 'Gap identification'],
  },
  {
    id: 'abstract',
    title: 'Abstract Generator',
    description: 'Create concise, publication-ready abstracts from full-length papers.',
    icon: 'FileEdit',
    color: 'from-primary-600 to-accent-600',
    features: ['250-word optimization', 'IMRAD structure', 'Keyword integration'],
  },
  {
    id: 'paraphrase',
    title: 'Paraphrasing Tool',
    description: 'Rephrase text while preserving meaning and improving clarity.',
    icon: 'RefreshCw',
    color: 'from-accent-600 to-pink-600',
    features: ['Plagiarism reduction', 'Academic tone', 'Multiple variants'],
  },
  {
    id: 'citation',
    title: 'Citation Generator',
    description: 'Generate citations in APA, MLA, Chicago, IEEE, and more.',
    icon: 'Quote',
    color: 'from-cyan-600 to-blue-600',
    features: ['7+ citation styles', 'DOI lookup', 'Batch export'],
  },
  {
    id: 'grammar',
    title: 'Grammar Improvement',
    description: 'Advanced grammar check with academic writing suggestions.',
    icon: 'CheckCircle',
    color: 'from-emerald-600 to-teal-600',
    features: ['Grammar & style', 'Clarity score', 'Academic vocabulary'],
  },
  {
    id: 'gap',
    title: 'Research Gap Finder',
    description: 'Identify unexplored areas and potential research opportunities.',
    icon: 'Search',
    color: 'from-orange-600 to-amber-600',
    features: ['Gap analysis', 'Trend detection', 'Topic suggestions'],
  },
];

export const historyPapers = [
  { id: 1, title: 'Attention Is All You Need',              authors: 'Vaswani et al.',  year: 2017, date: '2025-05-20', status: 'Analyzed',   size: '1.2 MB', pages: 15 },
  { id: 2, title: 'BERT: Pre-training of Deep Bidirectional Transformers', authors: 'Devlin et al.', year: 2019, date: '2025-05-19', status: 'Summarized', size: '2.1 MB', pages: 16 },
  { id: 3, title: 'GPT-4 Technical Report',                 authors: 'OpenAI',          year: 2023, date: '2025-05-18', status: 'Pending',    size: '8.4 MB', pages: 98 },
  { id: 4, title: 'LLaMA: Open and Efficient Foundation Language Models',  authors: 'Touvron et al.', year: 2023, date: '2025-05-17', status: 'Analyzed', size: '3.7 MB', pages: 27 },
  { id: 5, title: 'Denoising Diffusion Probabilistic Models', authors: 'Ho et al.',    year: 2020, date: '2025-05-16', status: 'Summarized', size: '2.9 MB', pages: 24 },
  { id: 6, title: 'ViT: An Image is Worth 16x16 Words',     authors: 'Dosovitskiy et al.', year: 2020, date: '2025-05-14', status: 'Analyzed', size: '1.8 MB', pages: 21 },
  { id: 7, title: 'Stable Diffusion: High-Resolution Image Synthesis', authors: 'Rombach et al.', year: 2022, date: '2025-05-12', status: 'Summarized', size: '5.2 MB', pages: 32 },
];

export const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'PhD Researcher · MIT',
    avatar: 'SC',
    text: 'PaperBOT cut my literature review time from 3 weeks to 3 days. The AI summaries are incredibly accurate and well-structured.',
    rating: 5,
    color: 'from-blue-500 to-primary-500',
  },
  {
    name: 'James Okafor',
    role: 'Graduate Student · Oxford',
    avatar: 'JO',
    text: 'The citation generator alone is worth it. It handles every style perfectly and the export feature is seamless.',
    rating: 5,
    color: 'from-purple-500 to-accent-500',
  },
  {
    name: 'Dr. Priya Nair',
    role: 'Associate Professor · IIT',
    avatar: 'PN',
    text: 'I recommend PaperBOT to all my students. The research gap finder helps them identify novel dissertation topics instantly.',
    rating: 5,
    color: 'from-cyan-500 to-teal-500',
  },
];

export const pricingPlans = [
  {
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Perfect for individual researchers getting started.',
    features: [
      '5 papers / month',
      'Basic AI summaries',
      'APA citation only',
      'Email support',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 19,
    period: 'month',
    description: 'For serious researchers and grad students.',
    features: [
      'Unlimited papers',
      'Advanced AI analysis',
      'All citation styles',
      'Literature review AI',
      'Grammar improvement',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Team',
    price: 49,
    period: 'month',
    description: 'For labs and research groups.',
    features: [
      'Everything in Pro',
      'Up to 10 members',
      'Shared paper library',
      'Collaboration tools',
      'API access',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];
