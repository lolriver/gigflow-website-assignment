import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Users,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Star } from
'lucide-react';

import Globe from '@/components/ui/Globe';

const Index = () => {
  const stats = [
  { label: 'Active Jobs', value: '500+' },
  { label: 'Freelancers', value: '2,000+' },
  { label: 'Completed Projects', value: '1,200+' },
  { label: 'Paid to Freelancers', value: '$2M+' }];


  const steps = [
  {
    step: '01',
    title: 'Create an Account',
    description: 'Sign up as a freelancer or client to get started on our platform.'
  },
  {
    step: '02',
    title: 'Post or Find Work',
    description: 'Clients post jobs, and freelancers browse and bid on projects that match their skills.'
  },
  {
    step: '03',
    title: 'Get Results',
    description: 'Work together using our secure platform and get paid instantly upon completion.'
  }];


  const features = [
  {
    icon: Briefcase,
    title: 'Post Jobs Easily',
    description: 'Create detailed job listings in minutes and reach thousands of skilled freelancers.'
  },
  {
    icon: Users,
    title: 'Find Top Talent',
    description: 'Browse bids from verified freelancers and choose the perfect match for your project.'
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Protected payments and secure communication keep your projects safe.'
  },
  {
    icon: Zap,
    title: 'Fast Hiring',
    description: 'Review bids, hire instantly, and get your project started the same day.'
  }];


  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-8">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="!w-[644px] !h-full !max-w-[644px]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-8">

                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                The future of work is here
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl md:text-8xl font-black text-foreground mb-8 leading-[0.9] tracking-tighter">

                Work Flow <br />
                <span className="gradient-text">Redefined.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed">

                A hyper-modern freelance ecosystem built for speed, transparency, and elite talent. Connect with top-tier projects globally.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center gap-8">

                <Button asChild size="lg" className="rounded-full h-16 px-10 bg-white text-black hover:bg-white/90 text-lg font-bold transition-all hover:scale-105 active:scale-95 group">
                  <Link to="/register">
                    Start Building
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) =>
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-background overflow-hidden bg-muted">
                        <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`}
                        alt="User"
                        className="w-full h-full object-cover" />

                      </div>
                    )}
                    <div className="w-12 h-12 rounded-full border-4 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                      +2k
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Trusted by 2000+</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Elite Freelancers</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Globe */}
            <div className="relative flex items-center justify-center lg:h-[700px]">
              {/* Added detail above the globe */}
              <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <div className="glass-dark px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2 shadow-[0_0_20px_rgba(255,45,85,0.1)]">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Global Network Live</span>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="text-[8px] uppercase tracking-tighter text-muted-foreground font-bold">Latency</div>
                    <div className="text-xs font-mono font-bold text-foreground">24ms</div>
                  </div>
                  <div className="w-px h-6 bg-border/50" />
                  <div className="flex flex-col items-center">
                    <div className="text-[8px] uppercase tracking-tighter text-muted-foreground font-bold">Nodes</div>
                    <div className="text-xs font-mono font-bold text-foreground">1,204</div>
                  </div>
                </div>
              </motion.div>

              <Globe />
              
                {/* Glass Cards - Positioned relative to the globe container */}
                <motion.div
                className="absolute top-[15%] right-0 glass-dark p-6 rounded-3xl max-w-[200px] z-20 shadow-[0_0_30px_rgba(255,45,85,0.15)]"
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, -10, 0]
                }}
                transition={{
                  opacity: { duration: 1, delay: 0.5 },
                  x: { duration: 1, delay: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}>

                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">Efficiency</div>
                      <div className="text-xl font-bold leading-none text-foreground">10x Faster</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                className="absolute bottom-[15%] left-0 glass-dark p-6 rounded-3xl max-w-[220px] z-20 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, 10, 0]
                }}
                transition={{
                  opacity: { duration: 1, delay: 0.7 },
                  x: { duration: 1, delay: 0.7 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                      <Shield className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">Security</div>
                      <div className="text-xl font-bold leading-none text-foreground">100% Secure</div>
                    </div>
                  </div>
                </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 blur-[150px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[50%] bg-blue-500/5 blur-[150px] -z-10" />
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card overflow-hidden">
        <div className="container py-12">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}>

            {stats.map((stat) =>
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className="text-center">

                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4">

              How GigFlow Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto">

              Get started in three simple steps
            </motion.p>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}>

            {steps.map((item) =>
            <motion.div
              key={item.step}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 }
              }}>

                <Card className="relative h-full border-border/50 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
                  <CardContent className="pt-8 pb-6">
                    <div className="text-6xl font-bold text-primary/10 absolute top-4 right-6 group-hover:scale-110 transition-transform duration-500">
                      {item.step}
                    </div>
                    <div className="relative">
                      <div className="h-12 w-12 rounded-xl gradient-hero flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,45,85,0.3)]">
                        <CheckCircle className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4">

              Why Choose GigFlow?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto">

              Everything you need to find talent or get hired
            </motion.p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}>

            {features.map((feature) =>
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                show: { opacity: 1, scale: 1, y: 0 }
              }}>

                <Card className="h-full border-border/50 shadow-card hover:shadow-card-hover transition-all duration-500 group hover:-translate-y-2">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-[0_0_15px_rgba(255,45,85,0.2)]">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl gradient-hero p-8 md:p-16 text-center overflow-hidden">

            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTJoLTR2Mmg0em0tNiAwaC0ydjRoMnYtNHptMCA2djJoNHYtMmgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
            <div className="relative">
              <DollarSign className="h-16 w-16 mx-auto mb-6 text-primary-foreground/80" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Start Earning?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Join thousands of freelancers who are already earning on GigFlow. Create your account and start bidding today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="font-semibold">
                  <Link to="/register">
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/gigs">Browse Jobs</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>);

};

export default Index;